/*
 * @author: yuting.zhou
 * @description: 销售点商品管理配置
 */
export const defaultEntity = {
  id: 0,
  adjustable: 1,
  amount: 1,
  equipmentType: '',
  name: '',
  shelfCode: '',
  shelfName: '',
  skuCode: '',
  status: 'Y',
};

export const searchDataTemplate = {
  name: '',
  skuCode: '',
  equipmentType: '38',
  status: 'Y',
  page: {
    pageNo: 1,
    pageSize: 20,
  },
};

export const rules = {
  skuCode: [
    { required: true, message: 'skuCode不能为空', trigger: 'blur' },
  ],
  equipmentType: [
    { required: true, message: '设备类型不能为空', trigger: 'blur' },
  ],
};

export const baseColumns = [
  {
    title: 'sku_code',
    key: 'skuCode',
  },
  {
    title: '商品名称',
    key: 'name',
  },
  {
    title: '可调陈列数',
    key: 'adjustable',
  },
  {
    title: '最大陈列数',
    key: 'amount',
  },
  {
    title: '上下架状态',
    key: 'status',
  },
];
