<template>
    <div class="view-models-wrapper">
        <el-table :data="data">
            <el-table-column label="型号名称" align="center" prop="modelName" />
            <el-table-column label="设备分类" align="center" prop="categoryName" />
            <el-table-column label="备注" align="center" prop="remark" />
        </el-table>
    </div>
</template>

<script>
    export default {
        name:'ViewModels',
        props:{
            data:{
                type:Array,
                default:[]
            }
        },
        data(){
            return{

            }
        },
        created(){

        }
    }
</script>

<style lang="scss" scoped>
    .view-models-wrapper{
        width: 100%;
        max-height: 80vh;
        padding: 20px 20px 10px 20px;
        overflow: auto;
    }
</style>