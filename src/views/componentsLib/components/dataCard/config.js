import model from '../../data/staticPanel/model.json'
import result from '../../data/staticPanel/result.json'
import total from '../../data/staticPanel/total.json'
export const COLOR={
  green:'green',
  oringe:'oringe',
  pink:'pink',
  blue:'1890FF',
  purple:'purple'
}

export const LIST = [
  {
    title:'基础用法',
    des:'基础用法',
    meta:{
      component:'StatisticPanel',
      des:'在 Form 组件中，每一个表单域由一个 Form-Item 组件构成，表单域中可以放置各种类型的表单控件，包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePick',
      template:`    &lt;template&gt;
          &lt;StatisticPanel :values=&quot;models.content&quot; :title=&quot;models.title&quot; :styles=&quot;{
            &apos;display&apos;: &apos;inline-block&apos;,
            &apos;margin&apos;: &apos;20px&apos;
          }&quot; :width=&quot;300&quot;
          @handleViewMore=&quot;showMore&quot;
    /&gt;
    &lt;/template&gt;
    &lt;script&gt;
            export default {
                data() {
                return {
                    models:{
                      title:'型号',
                      content:[
                        {
                            "title": "NLS-MT90",
                            "value": 4
                        },
                        {
                            "title": "SD100",
                            "value": 3
                        },
                        {
                            "title": "NLS-MT95-5G",
                            "value": 2
                        },
                        {
                            "title": "NLS-NFT10",
                            "value": 2
                        },
                        {
                            "title": "NLS-MT30",
                            "value": 1
                        }
                      ]
                    },
                }
                },
                methods: {
                  showMore(e){
                    console.log(e)
                  }
                }
            }
        &lt;/script&gt;`
    },
    data:{
      title: '型号',
      content: [
        ...model
      ]
    }
  },
  {
    title:'状态展示',
    des:'多状态展示',
    meta:{
      component:'StatisticPanel',
      des:'在 Form 组件中，每一个表单域由一个 Form-Item 组件构成，表单域中可以放置各种类型的表单控件，包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePick',
      template:`    &lt;template&gt;
          &lt;StatisticPanel :values=&quot;results.content&quot; :extra=&quot;false&quot; :title=&quot;results.title&quot; :styles=&quot;{
      &apos;display&apos;: &apos;inline-block&apos;,
      &apos;margin&apos;: &apos;20px&apos;
    }&quot; :width=&quot;300&quot;
    @handleViewMore=&quot;showMore&quot;
    /&gt;
    &lt;/template&gt;
    &lt;script&gt;
            export default {
                data() {
                return {
                    results:{
                      title:'型号',
                      content:[
                        {
                            "title": "成功",
                            "value": 419,
                            "status": "success"
                        },
                        {
                            "title": "失败",
                            "value": 11,
                            "status": "error"
                        },
                        {
                            "title": "执行中",
                            "value": 63,
                            "status": "info"
                        }
                      ]
                    },
                }
                },
                methods: {
                  showMore(e){
                    console.log(e)
                  }
                }
            }
        &lt;/script&gt;`
    },
    data:{
      title:'执行结果',
      content:[
        ...result
      ]
    }
  },
  {
    title:'额外信息展示',
    des:'额外信息展示，可自定义',
    meta:{
      component:'StatisticPanel',
      des:'在 Form 组件中，每一个表单域由一个 Form-Item 组件构成，表单域中可以放置各种类型的表单控件，包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePick',
      template:`    &lt;template&gt;
          &lt;StatisticPanel :values=&quot;list.content&quot; :extra=&quot;list.extra&quot; :title=&quot;list.title&quot; :type=&quot;list.type&quot; :styles=&quot;{
      &apos;display&apos;: &apos;inline-block&apos;,
      &apos;margin&apos;: &apos;20px&apos;
    }&quot; :width=&quot;300&quot;
    @handleViewMore=&quot;showMore&quot;
    /&gt;
    &lt;/template&gt;
    &lt;script&gt;
            export default {
                data() {
                return {
                    list:{
                      title:'终端数',
                      "extra": [
                                    {
                                        "title": "今日新增",
                                        "value": 0,
                                        "key": "add",
                                        "className":"green"
                                    },
                                    {
                                        "title": "当前在线",
                                        "value": 0,
                                        "key": "online",
                                        "className":"blue"
                                    },
                                    {
                                        "title": "当前离线",
                                        "value": 14,
                                        "key": "offline",
                                        "className":"default"
                                    }
                                ],
                      "content": [
                                    {
                                        "title": "Total",
                                        "value": 14
                                    },
                                    {
                                      "title": "Total",
                                      "value": 14
                                  },
                                    {
                                      "title": "Total",
                                      "value": 14
                                  },
                                  {
                                      "title": "Total",
                                      "value": 14
                                  },
                                  {
                                    "title": "Total",
                                    "value": 14
                                },
                                  {
                                    "title": "Total",
                                    "value": 14
                                },
                                {
                                  "title": "Total",
                                  "value": 14
                                }
                              ],
                    },
                }
                },
                methods: {
                  showMore(e){
                    console.log(e)
                  }
                }
            }
        &lt;/script&gt;`
    },
    data:{
     ...total
    },
    attrs:{
      extra:total.extra
    }
  }
]

export const attrData = [
  {
    params:'styles',
    des:'样式',
    type:'object/string',
    selectable:'',
    defaultValue:'',
  },
  {
    params:'title',
    des:'卡片标题',
    type:'string',
    selectable:'',
    defaultValue:'',
  },
  {
    params:'showCloseButton',
    des:'显示关闭按钮',
    type:'boolean',
    selectable:'true/false',
    defaultValue:'false',
  },
  {
    params:'showMoreButton',
    des:'显示更多按钮',
    type:'boolean',
    selectable:'true/false',
    defaultValue:'false',
  },
  {
    params:'height',
    des:'高度',
    type:'number/string',
    selectable:'',
    defaultValue:'150',
  },
  {
    params:'width',
    des:'宽度',
    type:'number/string',
    selectable:'',
    defaultValue:'300',
  },
  {
    params:'values',
    des:'值',
    type:'array',
    selectable:'',
    defaultValue:'[]',
  },
  {
    params:'extra',
    des:'其他信息',
    type:'boolean',
    selectable:'true/false',
    defaultValue:'false',
  },
  {
    params:'length',
    des:'长度',
    type:'number',
    selectable:'',
    defaultValue:'3',
  },
]
export const eventData=[
  {
    name:'',
    des:'',
    params:''
  }
]
