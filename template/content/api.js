/*
 * @author: yuting.zhou
 * @description: CURD Api
 */

// 引入你自己的Api
import Request from '@/api';

// 添加
export function create(data) {
  const uri = '添加的接口';
  return Request.post(uri, data);
}

// 更新
export function update(data) {
  const uri = '更新的接口';
  return Request.post(uri, data);
}

// 查询
export function retrieve(data) {
  const uri = '查询的接口';
  return Request.get(uri, data);
}

// 删除
export function delete(shelfCode) {
  const uri = '删除的接口';
  return Request.get(uri, data);
}
