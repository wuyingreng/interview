<template>
  <div class="pagination-demo">
    <h2>分页表格示例</h2>
    
    <!-- 方法选择 -->
    <div class="method-selector">
      <el-radio-group v-model="currentMethod" @change="resetData">
        <el-radio label="reactive">方法1: reactive + 直接操作</el-radio>
        <el-radio label="ref">方法2: ref + 整体替换</el-radio>
        <el-radio label="reactive-splice">方法3: reactive + splice</el-radio>
      </el-radio-group>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="email" label="邮箱" width="200" />
      <el-table-column prop="age" label="年龄" width="80" />
      <el-table-column prop="city" label="城市" width="120" />
      <el-table-column prop="createTime" label="创建时间" />
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 50]"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 调试信息 -->
    <div class="debug-info">
      <h3>调试信息</h3>
      <p>当前方法: {{ currentMethod }}</p>
      <p>当前页: {{ currentPage }}</p>
      <p>每页条数: {{ pageSize }}</p>
      <p>总条数: {{ total }}</p>
      <p>表格数据长度: {{ Array.isArray(tableData) ? tableData.length : 'N/A' }}</p>
      <el-button @click="logTableData">打印表格数据到控制台</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, watch } from 'vue'

  // 当前使用的方法
  const currentMethod = ref('reactive')
  
  // 分页参数
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)

  // 方法1: reactive - 直接操作数组
  const reactiveList = reactive<any[]>([])
  
  // 方法2: ref - 整体替换
  const refList = ref<any[]>([])
  
  // 方法3: reactive + splice
  const spliceList = reactive<any[]>([])

  // 当前显示的表格数据
  const tableData = ref<any[]>([])

  // 模拟API请求
  const fetchData = async (page: number, size: number) => {
    console.log(`请求第${page}页，每页${size}条`)
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 模拟数据
    const mockData = []
    const start = (page - 1) * size
    for (let i = 0; i < size; i++) {
      mockData.push({
        id: start + i + 1,
        name: `用户${start + i + 1}`,
        email: `user${start + i + 1}@example.com`,
        age: 20 + (start + i) % 50,
        city: ['北京', '上海', '广州', '深圳', '杭州'][(start + i) % 5],
        createTime: new Date(Date.now() - Math.random() * 10000000000).toLocaleString()
      })
    }
    
    return {
      data: mockData,
      total: 100 // 模拟总数
    }
  }

  // 方法1: reactive 直接操作
  const loadDataWithReactive = async () => {
    const result = await fetchData(currentPage.value, pageSize.value)
    
    // 清空数组
    reactiveList.length = 0
    
    // 添加新数据
    reactiveList.push(...result.data)
    
    total.value = result.total
    tableData.value = reactiveList
  }

  // 方法2: ref 整体替换
  const loadDataWithRef = async () => {
    const result = await fetchData(currentPage.value, pageSize.value)
    
    // 直接替换整个数组
    refList.value = result.data
    
    total.value = result.total
    tableData.value = refList.value
  }

  // 方法3: reactive + splice
  const loadDataWithSplice = async () => {
    const result = await fetchData(currentPage.value, pageSize.value)
    
    // 使用 splice 替换所有元素
    spliceList.splice(0, spliceList.length, ...result.data)
    
    total.value = result.total
    tableData.value = spliceList
  }

  // 加载数据
  const loadData = () => {
    switch (currentMethod.value) {
      case 'reactive':
        loadDataWithReactive()
        break
      case 'ref':
        loadDataWithRef()
        break
      case 'reactive-splice':
        loadDataWithSplice()
        break
    }
  }

  // 重置数据
  const resetData = () => {
    currentPage.value = 1
    pageSize.value = 10
    reactiveList.length = 0
    refList.value = []
    spliceList.length = 0
    tableData.value = []
    total.value = 0
  }

  // 页面大小改变
  const handleSizeChange = (val: number) => {
    pageSize.value = val
    currentPage.value = 1
    loadData()
  }

  // 当前页改变
  const handleCurrentChange = (val: number) => {
    currentPage.value = val
    loadData()
  }

  // 打印表格数据到控制台
  const logTableData = () => {
    console.log('=== 表格数据调试信息 ===')
    console.log('当前方法:', currentMethod.value)
    console.log('表格数据:', tableData.value)
    console.log('reactiveList:', reactiveList)
    console.log('refList:', refList.value)
    console.log('spliceList:', spliceList)
    console.log('========================')
  }

  // 监听方法变化
  watch(currentMethod, () => {
    loadData()
  })

  // 初始化
  loadData()
</script>

<style scoped>
  .pagination-demo {
    padding: 20px;
  }

  .method-selector {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 8px;
  }

  .debug-info {
    margin-top: 20px;
    padding: 15px;
    background-color: #f0f9ff;
    border-radius: 8px;
    border: 1px solid #bae6fd;
  }

  .debug-info h3 {
    margin-top: 0;
    color: #0369a1;
  }

  .debug-info p {
    margin: 5px 0;
    font-size: 14px;
  }
</style>
