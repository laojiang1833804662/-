<template>
  <div class="product">
    <div class="search">
      <!-- 搜索框 -->
      <template>
        <el-select
          v-model="searchValue"
          filterable
          clearable
          remote
          @blur="searchBlur"
          reserve-keyword
          @clear="clear"
          @change="searchTextChange"
          placeholder="请输入姓名,如果不更新,点击右侧搜索按钮"
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option
            v-for="item in searchList"
            :key="item.sId"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </template>

      <!-- 搜索按钮 -->
      <el-button type="primary" icon="el-icon-search" @click="searchButton"
        >搜索</el-button
      >
      <!-- 添加按钮 -->
      <el-button type="primary" 
      @click="addStu"
      v-has="'add'"
      >添加项目</el-button>
    </div>
    <!-- 班级选择 -->
    <div class="select-class">
      选择班级：
      <template>
        <el-select v-model="classes"
         filterable
         placeholder="请选择"
         @change="classchange"
         @visible-change="classvisible"
          >
          <el-option label="全部" value="all"></el-option>
          <el-option
            v-for="(item,index) in classOptions"
            :key="index"
            :label="item.class"
            :value="item.class"
          >
          </el-option>
        </el-select>
      </template>
    </div>
    <!-- 导出表格数据 -->
    <div class="exportExcel">
      <el-button icon="iconfont icon-excel" @click="daochu">导出excel数据</el-button>
    </div>
    <!--表格 -->
    <div class="stu-table">
      <template>
        <el-table :data="stuData" borderstyle="width: 100%" v-loading="loading">
          <el-table-column
            align="center"
            prop="headimgurl"
            label="头像"
            width="80"
          >
            <!-- 头像 -->
            <!-- scope相当于继承stuData数据-->
            <template scope="scope">
              <img :src="scope.row.headimgurl" width="70" alt="" />
            </template>
          </el-table-column>

          <el-table-column align="center" prop="name" label="姓名" width="180">
          </el-table-column>

          <el-table-column align="center" prop="class" label="班级">
          </el-table-column>

          <el-table-column align="center" prop="productUrl" label="项目地址">
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template scope="{row}">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="editstu(row)"
                v-has="'edit'"
                >编辑</el-button
              >
              <el-button type="warning"
               icon="el-icon-edit"
                v-has="'read'"
               >查看</el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="deletstu(row)"
                v-has="'delete'"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination background
       layout="prev, pager, next" 
       :total="total"
       :page-size="dataCount"
        @current-change="changePage"
       >
      </el-pagination>
    </div>
    <!--展示dialog -->
    <Dialog></Dialog>
  </div>
</template>
<script>
import qee from 'qf-export-excel'
import Dialog from "./../../../components/dialog/index";
import { getStuList, delStuList, seacherstu, getclasses ,addStuDetail} from "../../../api/index";
import { log } from "util";
// 引入接口请求
export default {
  components: {
    Dialog
  },
  data() {
    return {
      timer:"",
      //娱乐循环
       stuform: {
          name: '邪神-加坦杰厄',
          productUrl: 'm78星云',
          headimgurl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3843647078,2248193447&fm=26&gp=0.jpg',
          class: '奥特队',
          age: '18',
          city: '悉尼',
          degree: '45',
          description: '一个小时'
        },
      blurSearchValue: "",
      searchValue: "",
      // 搜索框显示的数据
      searchList: [],
      classOptions: [],
      classes: [],
      list: [],
      loading: false,
      //搜索依据
      states: [],
      // 表格数据
      stuData: [],
      //表格加载动画
      loading:true,
      params:{
        class:"",
        count:5,
      },
       dataPage: '', // 页码
      dataCount:5, // 每页展示的数量
      total: 0, // 总共的数据条数
    };
  },

  methods: {
    //分页器触发事件,页码发生改变的时候
    changePage(page){
    //  console.log(page);
    this.dataPage = page
    this.updatestutable(this.params)
    
    },
    //导出表格
    daochu(){
      //titlelist对应的是要导出的列，title表示类名，key表示对应数据的字段
      //datasouer,代表数据源
      let titlelist=[
        {title:'姓名',key:"name",},
          {title:'班级',key:"class",},
        {title:'项目',key:"productUrl",},
      ]
      let datasoure=this.stuData
     qee(titlelist,datasoure,'项目笔记')
    },
    //编辑学员
    editstu(row) {
      //弹出dialog，数据回显，更改提交
      this.$bus.$emit("editStuEvent", row);
    },
    //删除学员
    deletstu(row) {
      //删除学员
      if (row && row.sId) {
        delStuList(row.sId)
          .then(res => {
            console.log(res);
            if (res.data && res.data.data) {
              //删除成功
              this.$message.success("删除成功");
            } else {
              this.$message.error("删除失败");
            }
          })
          .catch(err => {
            console.log(删除出错);
          });
      }
    },
    //添加学员,弹出dialog
    addStu() {
      this.$bus.$emit("showDialog");
    },
    //更新表格数据
    updatestutable(params) {
      params = this.params
      params.count = this.dataCount || ''
      params.page = this.dataPage || ''
      getStuList(params).then(res => {
        if (res.data && res.data.state) {
          this.stuData = res.data.data;
          this.total = res.data.total
          this.loading = false;
        } else {
          this.$message.error("数据获取失败");
        }
      });
    },
    //搜索框,会一直触发，所以选择，加一个搜索按钮
    clear(e) {}, //加这个就不会一直触发了
    remoteMethod(query) {
      this.blurSearchValue = query
      const key = query
      const count = this.dataCount
      const params = {
        key,
        count
      }
      seacherstu(params)
        .then(res => {
          if (res.data && res.data.data) {
            this.searchList = res.data.data
          } else {
            this.$message.warning('搜索失败')
          }
        }).catch(err => {
          this.$message.error('搜索出错')
        })
    },
    // 搜索框选中值发生变化的事件，值清零也是一样的,并且点中
    searchTextChange(searchText) {
       const key = this.searchValue
      const count = this.dataCount
      const params = {
        key,
        count
      }
      seacherstu(params).then(res => {
        if (res.data && res.data.state) {
          // 更改表格数据对象
          this.stuData = res.data.data;
          this.total = res.data.total 
        } else {
          this.$message.warning("搜索失败");
        }
      });
    },
    //搜索按钮
    searchButton() {
      const key = this.searchValue
      const count = this.dataCount
      const page = this.dataPage
      const params = {
        key,
        count,
        page
      }
      seacherstu(params)
        .then(res => {
          if (res.data && res.data.data) {
            // 更改表格数据对象
            this.stuData = res.data.data
            this.total = res.data.total // 对total分页总数进行更改
          } else {
            this.$message.warning('搜索失败')
          }
        })
    },
    //搜索框失去焦点，保持输入框的内容
    searchBlur() {
      this.searchValue = this.blurSearchValue;
    },
  //选择班级
    classchange(query){
      const count = this.dataCount
      this.params = query === 'all' ? { count } : { class: query, count }
      this.updatestutable(this.params)
    },
    //班级选择，展开的事件
    classvisible(isvisilble){
      //isvisible,真表示展开，否则就不展开
    // console.log(isvisilble);
    if(!isvisilble){return}
    getclasses()
    .then(res=>{
      if(res.data && res.data.data){
        this.classOptions=res.data.data
      }
    })
    }
      },
  mounted() {
    this.updatestutable(this.params);
    //dialog确定按钮触发这边更新视图
    this.$bus.$on("updatestutable", () => {
      this.updatestutable(this.params);
    });
  },
};
</script>
<style scoped>
.search {
  line-height: 60px;
  text-align: left;
  margin: 20px 0;
}
.select-class {
  line-height: 40px;
  text-align: left;
  margin-bottom: 20px;
}
.stu-table .btn {
  width: 65px;
  height: 25px;
  padding: 0;
}
.pagination {
  margin-top: 20px;
}
</style>