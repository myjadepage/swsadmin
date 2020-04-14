import { setOrderItem } from '@/components/order/CodeMapping.js'
export default {
    data: () => ({
        items: [],
        totalRow: 0,        
        rowPackage: 200,    // REST 호출시에 로딩 row 건수
        perPage: 10,        // 페이지당 조회 건수
        req: {},
        isbusy: false
    }),
    methods: {
        // 초기 데이터 로딩 
        initialloadData: function (req) {
            this.req = req
            this.isbusy = true
            req.startIndex = 0
            req.rowCount = this.rowPackage
            this.axiosGetRequest('/api/v1/orders', req, function (res){
                this.items.splice(0)
                if (this.isEmpty(res.data.jsonData['orders'])) { this.isbusy = false; return false }
                res.data.jsonData.orders.forEach(item => {
                    this.items.push(setOrderItem(item))
                })
                this.totalRow = res.data.jsonData.orders.length
                this.isbusy = false
            }.bind(this))
        },
        // 페이징 이벤트
        changePage: function (currentPage) {
            if(currentPage/this.totalRow > 0.5) {
                this.req.startIndex = this.totalRow
                this.axiosGetRequest('/api/v1/orders', this.req, function (res) {
                    if (this.isEmpty(res.data.jsonData['orders'])) { return false }
                    this.totalRow = (this.totalRow + res.data.jsonData.orders.length)
                    if (!this.isEmpty(res.data.jsonData['orders'])) {
                        const data = res.data.jsonData.orders
                        data.forEach(item => {
                            this.items.push(setOrderItem(item))
                        }) 
                    }
                }.bind(this))
            }
        },
    }
}