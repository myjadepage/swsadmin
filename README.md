# vue-sws-admin

### Components/common에 존재하는 공통 컴포넌트
#### SwsSeller
- :parentData => form으로 전달할 Object를 매핑하여주면, 그 안에 존재하는 sellerSysId를 찾아서 변경해줌
- @changeFn => 부모측에 함수를 생성한후 파라미터로 sellerSysId를 전달해줌, 여기에서 브랜드 변경해주는 로직을 삽입해주면 됨
```javascript
/* 먼저 form으로 Object를 생성한다. */
data () {
    return {
        form: {
            ...
            ...
            sellerSysId: 0
        }
    }
}

/* 그 후에 컴포넌트를 호출한다.*/
import SwsSeller from '@/components/common/SwsSeller.vue'
<sws-seller
    :parentData="form"
    @changeFn="resultSeller"
></sws-seller>
function resultSeller (val) {
/* val = sellerSysId */
/* 필요한 로직을 사용하면 된다. 아마도 브랜드 컴포넌트에 영향이 갈것을 삽입해주면 될것 같다. */
}
```

#### SwsBrand
- :parentData => form으로 전달할 Object를 매핑하여주면, 그 안에 존재하는 brandSysId를 찾아서 변경해줌
- ref명을 꼭 정하도록 한다.
```javascript
/* 먼저 form으로 Object를 생성한다. */
data () {
    return {
        form: {
            ...
            ...
            brandSysId: 0
        }
    }
}

/* 그 후에 컴포넌트를 호출한다.*/
import SwsBrand from '@/components/common/SwsBrand.vue'
<sws-brand
    :parentData="form"
    ref="brand"
></sws-brand>
function resultSeller(val) {
    // 브랜드 ref를 정하도록 하자 !
    this.$refs.brand.changeBrand(val)
}
```
#### SwsCateogry
- :selectedCategory => 배열 형태로 매핑이 된다.
```javascript
/* 먼저 form으로 Object를 생성한다. */
data () {
    return {
        form: {
            ...
            ...
            cateogryList: []
        }
    }
}

/* 그 후에 컴포넌트를 호출한다.*/
import SwsCategory from '@/components/common/SwsCategory.vue'
<sws-cateogry
    :selectedCategory="form.SwsCategory"
></sws-cateogry>
```
#### SwsDate
- :parentData => form으로 전달할 Object를 매핑하여주면, 그 안에 존재하는 startDate, endDate를 변경해준다.
```javascript
/* 먼저 form으로 Object를 생성한다. */
data () {
    return {
        form: {
            ...
            ...
            startDate: '',
            endDate: ''
        }
    }
}

/* 그 후에 컴포넌트를 호출한다.*/
import SwsDate from '@/components/common/SwsDate.vue'
<sws-date
    :parentData="form"
></sws-date>
```
