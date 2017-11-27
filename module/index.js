/*
 * @author: yuting.zhou
 * @description: 销售点商品管理业务
 */
import {
  searchDataTemplate,
  defaultEntity,
  baseColumns,
  rules,
} from './config';
import { search, del, save, getExcelUri } from './api';

export default {
  data() {
    return {
      searchCondition: JSON.parse(JSON.stringify(searchDataTemplate)),
      entity: JSON.parse(JSON.stringify(defaultEntity)),
      isShowModal: false,
      dataSource: [],
      rules,
      page: {
        ...searchDataTemplate.page,
      },
      columns: [...baseColumns,
        {
          title: '所在设备类型',
          key: 'equipmentType',
          render: (h, { row }) => this.$store.state.equipmentTypesMapper[row.equipmentType],
        },
        {
          title: '操作',
          render: (h, { row }) => h('div', [
            h('Button', {
              props: {
                type: 'primary',
              },
              style: {
                marginRight: '5px',
              },
              on: {
                click: () => {
                  const { _index, _rowKey, ...origin } = row;
                  this.entity = JSON.parse(JSON.stringify(origin));
                  this.entity.equipmentType = `${this.entity.equipmentType}`;
                  this.isShowModal = true;
                },
              },
            }, '编辑'),
            h('Button', {
              props: {
                type: 'error',
              },
              on: {
                click: () => {
                  this.del(row.id);
                },
              },
            }, '删除'),
          ]),
        }],
    };
  },

  computed: {
    dialogTitle() {
      return this.entity && this.entity.id ? '编辑商品' : '新增商品';
    },

    booth() {
      return this.$route.query;
    },

    deviceTypes() {
      return this.$store.state.equipmentTypes;
    },

    sellingStatusList() {
      return this.$store.state.statusList;
    },

    exportHref() {
      return getExcelUri(this.entity.shelfCode);
    },
  },

  methods: {
    initEntity() {
      this.entity = { ...JSON.parse(JSON.stringify(defaultEntity)),
        shelfCode: this.$route.query.code,
        shelfName: this.$route.query.name,
      };
    },
    openDialog() {
      this.isShowModal = true;
    },

    onPreSearch() {
      this.page.pageNo = 1;
      this.onSearch();
    },

    onSearch(isFetchAll) {
      let data = { ...this.searchCondition };
      const { pageNo, pageSize } = this.page;
      data.page = { pageNo, pageSize };
      if (isFetchAll) {
        data = { ...JSON.parse(JSON.stringify(searchDataTemplate)) };
      }
      data.shelfCode = this.booth.code;
      search(data).then((resData) => {
        this.dataSource = resData.data || [];
        this.page.totalSize = resData.page.totalSize || 0;
      }).catch((res) => {
        this.$Message.error(res.msg);
      });
    },

    handlePageChange(pageNo) {
      this.page.pageNo = pageNo;
      this.onSearch();
    },

    del(id) {
      this.$Modal.confirm({
        content: '确定要删除?',
        onOk: () => {
          del({ id }).then(() => {
            this.$Message.success('删除成功');
            this.searchCondition = JSON.parse(JSON.stringify(searchDataTemplate));
            this.onSearch(true);
          }).catch((res) => {
            this.$Message.error(res.msg);
          });
        },
      });
    },

    onSave() {
      save({ ...this.entity }).then(() => {
        this.$Message.success('保存成功');
        this.searchCondition = JSON.parse(JSON.stringify(searchDataTemplate));
        this.onSearch(true);
        this.isShowModal = false;
        this.initEntity();
      }).catch((res) => {
        this.$Message.error(res.msg || '保存失败');
      });
    },

    fetchCommodityName() {
      this.$store.dispatch('commodity/FETCH_COMMODITY_BY_CODE',
        { skuCode: this.entity.skuCode }).then((resData) => {
          this.entity.name = resData;
        }).catch((res) => {
          this.$Message.error(res.msg || '获取商品名称失败');
        });
    },
  },

  beforeMount() {
    this.initEntity();
  },

  mounted() {
    this.onSearch(true);
  },
};
