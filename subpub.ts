type FnSub = <T>(params: T) => T
class SubPub {
  // 事件池
  private eventMap: Map<string, FnSub[]>
  constructor() {
    this.eventMap = new Map()
  }
  // 添加订阅函数
  public subscript(key: string, fn: FnSub) {
    // 判断key存不存在以及重复
    if (!key) return
    !this.eventMap.has(key) && this.eventMap.set(key, [])
    this.eventMap.set(key, [...this.eventMap.get(key)!, fn])
  }
  // 使用发布数据函数
  public publish<T>(key: string, params: T) {
    // 在事件池里找到key对应的方法，并且传参执行
    if (!key) return
    if (this.eventMap.has(key)) {
      this.eventMap.get(key)?.forEach((callback) => {
        callback(params)
      })
    }
  }
  // 移除订阅
  public removeSub(key: string, fn: FnSub) {
    this.eventMap.has(key) && this.eventMap.set(key, [])
  }
}

export default new SubPub()
export type { FnSub }
