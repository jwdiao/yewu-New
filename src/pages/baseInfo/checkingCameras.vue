<template>
  <div class="checking-cameras">
    <head-top></head-top>
    <template>
      <el-table
        :data="dataList"
        stripe
        style="width: 100%; margin-top: 20px;">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="attendancesite"
          label="考勤地点">
        </el-table-column>
        <el-table-column
          prop="attancetype"
          label="摄像头种类">
        </el-table-column>
      </el-table>
    </template>
    <template>
    <div class="block" style="padding: 20px; text-align: center;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="pageTotal">
      </el-pagination>
    </div>
</template>
  </div>
</template>
<script>
    import HeadTop from '../../components/headTop';
    import http from '../../api/http'
    import {getCookieInfo} from '../../api/getCookie'
    export default {
        name: "checkingcameras",
        components: {HeadTop},
        data (){
          return {
            dataList: [
               /* {attendancesite: '机加区东侧入口_人脸2', attancetype: '出门'},
                {attendancesite: '机加区东侧入口_人脸2', attancetype: '出门'}*/
            ],
            currentPage: 1,
            pageSize: 20,
            pageTotal: 0,
          }
        },
        created(){
          this.renderData();
        },
        methods: {
          async renderData(){
            let axiosUrl = getCookieInfo().baseUrl + '/sanyAttendanceSite/findListByCondition'
            console.log('考勤摄像头信息:',axiosUrl)
            var result = await http.post(axiosUrl,{page: this.currentPage+'', pagesize: this.pageSize+''});
            // var result = await http.post('/sanyAttendanceSite/findListByCondition',{page: this.currentPage+'', pagesize: this.pageSize+''});
            if(result.data.ret == 200){
              this.pageTotal = result.data.total;
              const arr = result.data.list;
              arr.forEach(function (v) {
                if(v.attancetype == 0){
                  return v.attancetype = '进';
                }else {
                  return v.attancetype = '出';
                }
              })
              this.dataList = arr;
            }
          },
          handleSizeChange(pageSize){
            this.pageSize = pageSize;
            this.renderData();
          },
          handleCurrentChange(currentPage){
            this.currentPage = currentPage;
            this.renderData();
          }
        },
    }
</script>

<style scoped>
  /deep/ thead {
    color: #333;
  }
</style>
