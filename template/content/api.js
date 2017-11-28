/*
 * @author: yuting.zhou
 * @description: 销售点商品管理接口
 */
import Request from '@/api';

// 编辑
export function save(data) {
  const uri = '/unmanned/shelves/admin/goods/save/v1';
  return Request.post(uri, data);
}

// 查询
export function search(data) {
  const uri = '/unmanned/shelves/admin/goods/list/v1';
  return Request.post(uri, data);
}

// 删除
export function del(data) {
  const uri = '/unmanned/shelves/admin/goods/delete/v1';
  return Request.get(uri, data);
}

// 导出
export function getExcelUri(shelfCode) {
  return `/unmanned/shelves/admin/export/excel/${shelfCode}/shelf_goods_relation/v1`;
}
