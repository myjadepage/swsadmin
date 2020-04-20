<template>
    <div id="contents">
        <h3>{{$route.name}}</h3>
        <ul class="navi">
            <li class="home"><a href="/" target="_top">홈</a></li>
            <li>상품관리</li>
            <li>카테고리관리</li>
            <li class="on">{{$route.name}}</li>
        </ul>
        <ul class="helpbox">
            <li>카테고리를 설정합니다.</li>
            <li>이미지파일은 GIF, JPG로 올려주시기 바랍니다.</li>
        </ul>

        <table id="frameBox">
            <tbody>
                <tr>
                    <td>
                        <table class="table table-bordered t_category category">
                            <colgroup>
                                <col width="250px" />
                                <col width="*" />
                            </colgroup>
                            <tr>
                                <th class="align-middle pl-4">
                                    1차 카테고리
                                </th>
                                <td class='category-dashboard category1'>
                                    <h3 v-for="(item1, index) in categories1Level.children" :key="index" class="category-item" @click="clickCategoryLevel(item1)" @dblclick="categoryOverFn">
                                        <a href="#" class="badge badge-danger category-item close-btn" style="display: none;" @click="deleteCategory(item1)">x</a>
                                        <a href="#" class="badge badge-success category-item modify-btn" style="display: none;" @click="showMoveModelCategory(item1)">#</a>
                                        <a href="#" class="badge badge-light category-item item">
                                            {{ item1.name }}
                                        </a>
                                    </h3>
                                    <h3 class="category-item add-btn category1" @click="showInsertModal(1)">
                                        <a href="#" class="badge badge-light category-item item">
                                            <font-awesome-icon icon="plus"/> 카테고리 추가
                                        </a>
                                    </h3>
                                </td>
                            </tr>
                            <tr>
                                <th class="align-middle pl-4">
                                    2차 카테고리
                                </th>
                                <td class='category-dashboard category2'>
                                    <h3 v-for="(item2, index) in categories2Level.children" :key="index" class="category-item" @click="clickCategoryLevel(item2)" @dblclick="categoryOverFn">
                                        <a href="#" class="badge badge-danger category-item close-btn" style="display: none;" @click.passive="deleteCategory(item2)">x</a>
                                        <a href="#" class="badge badge-success category-item modify-btn" style="display: none;" @click="showMoveModelCategory(item2)">#</a>
                                        <a href="#" class="badge badge-light category-item item">{{ item2.name }}</a>
                                    </h3>
                                    <h3 class="category-item add-btn category2" @click="showInsertModal(2)" style="display:none">
                                        <a href="#" class="badge badge-light category-item item">
                                            <font-awesome-icon icon="plus"/> 카테고리 추가
                                        </a>
                                    </h3>
                                </td>
                            </tr>
                            <tr>
                                <th class="align-middle pl-4">
                                    3차 카테고리
                                </th>
                                <td class='category-dashboard category3'>
                                    <h3 v-for="(item3, index) in categories3Level.children" :key="index" class="category-item" @click="clickCategoryLevel(item3)" @dblclick="categoryOverFn">
                                        <a href="#" class="badge badge-danger category-item close-btn" style="display: none;" @click="deleteCategory(item3)">x</a>
                                        <a href="#" class="badge badge-success category-item modify-btn" style="display: none;" @click="showMoveModelCategory(item3)">#</a>
                                        <a href="#" class="badge badge-light category-item item">{{ item3.name }}</a>
                                    </h3>
                                    <h3 class="category-item add-btn category3" @click="showInsertModal(3)" style="display:none">
                                        <a href="#" class="badge badge-light category-item item">
                                            <font-awesome-icon icon="plus"/> 카테고리 추가
                                        </a>
                                    </h3>
                                </td>
                            </tr>
                            <tr>
                                <th class="align-middle pl-4">
                                    4차 카테고리
                                </th>
                                <td class='category-dashboard category4'>
                                    <h3 v-for="(item4, index) in categories4Level.children" :key="index" class="category-item" @click="clickCategoryLevel(item4)" @dblclick="categoryOverFn">
                                        <a href="#" class="badge badge-danger category-item close-btn" style="display: none;" @click="deleteCategory(item4)">x</a>
                                        <a href="#" class="badge badge-success category-item modify-btn" style="display: none;" @click="showMoveModelCategory(item4)">#</a>
                                        <a href="#" class="badge badge-light category-item item">{{ item4.name }}</a>
                                    </h3>
                                    <h3 class="category-item add-btn category4" @click="showInsertModal(4)" style="display:none">
                                        <a href="#" class="badge badge-light category-item item">
                                            <font-awesome-icon icon="plus"/> 카테고리 추가
                                        </a>
                                    </h3>
                                </td>
                            </tr>
                            <tr>
                                <th class="align-middle pl-4">
                                    5차 카테고리
                                </th>
                                <td class='category-dashboard category5'>
                                    <h3 v-for="(item5, index) in categories5Level.children" :key="index" class="category-item" @click="clickCategoryLevel(item5)" @dblclick="categoryOverFn">
                                        <a href="#" class="badge badge-danger category-item close-btn" style="display: none;" @click="deleteCategory(item5)">x</a>
                                        <a href="#" class="badge badge-success category-item modify-btn" style="display: none;" @click="showMoveModelCategory(item5)">#</a>
                                        <a href="#" class="badge badge-light category-item item">{{ item5.name }}</a>
                                    </h3>
                                    <h3 class="category-item add-btn category5" @click="showInsertModal(5)" style="display:none">
                                        <a draggable="true" href="#" class="badge badge-light category-item item">
                                            <font-awesome-icon icon="plus"/> 카테고리 추가
                                        </a>
                                    </h3>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <form name="Frm" method="post">
                            <div id="wrap_body">
                                <!-- 카테고리 정보 : 시작 -->
                                <div class="box">
                                    <div class="section_head">
                                        <h4><font-awesome-icon icon="info-circle" /> 카테고리 추가</h4>
                                    </div>

                                    <table class="t_form">
                                        <caption>카테고리 내용 입력폼</caption>
                                        <tbody>
                                            <tr>
                                                <th>현재 카테고리</th>
                                                <td class="category">
                                                    <u id="target_category"> {{ selectCategory.breadcrumb() }}</u>
                                                    <!-- <template v-if="categories2Level.children.length > 0">
                                                        <a href="#" class="btn btn-light btn-sm" @click="newCategorySub()"> + 추가</a>
                                                    </template> -->
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>카테고리명</th>
                                                <td>
                                                    <input type="text" name="name" v-model="selectCategory.title" class="text_input" style="width:98%" maxlength="100">
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>아이콘 설정</th>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <th>수수료율</th>
                                                <td>
                                                    <input type="text" class="text_input" style="width:50px; text-align:right" v-model="selectCategory.feeRate" maxlength="5"> %
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>숨김 여부</th>
                                                <td>
                                                    <span>
                                                        <input type="radio" id="isHideTrue" name="hidden" value=true v-model="selectCategory.isHide" checked>
                                                        <label for="isHideTrue">노출</label>
                                                    </span>
                                                    <span class="mgl20">
                                                        <input type="radio" id="isHideFalse" name="hidden" value=false v-model="selectCategory.isHide" >
                                                        <label for="isHideFalse">숨김</label>
                                                    </span>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <!-- 카테고리 정보 : 끝 //-->
                                
                                <!-- 상단 꾸미기 : 시작 -->
                                <div class="box">
                                    <div class="section_head">
                                        <h4><font-awesome-icon icon="info-circle" /> 카테고리 상단 디자인</h4>
                                    </div>
                                    <quill-editor
                                        ref="editorOptionRef"
                                        class="quill-editor" 
                                        :options="editorOption"
                                        id="categorCommentHtml" 
                                        name="categorCommentHtml" 
                                        v-model="selectCategory.topDesignHTML"
                                    ></quill-editor>
                                    <input type="file" id="categorCommentHtmlImage" accept="image/*" style="display:none" @change="categorCommentHtmlimageHandler" />

                                    <table class="t_form">
                                        <tbody>
                                            <tr>
                                                <th>하위 적용</th>
                                                <td>
                                                    <input type="checkbox" name="isInheritTopDecor" v-model="selectCategory.isApplyChildCategory"> 하위 카테고리에도 동일 하게 적용.
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- 상단 꾸미기 : 끝 //-->
                                <div class="btn_center">
                                    <b-button type="button" class="btn btn-info" @click="modifyCategory">확인</b-button>&emsp;
                                    <b-button type="button" class="btn btn-danger">삭제</b-button>
                                </div>
                            </div>
                        </form>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal -->
        <b-modal ref="root-my-modal" hide-footer title="카테고리 생성">
            <!-- <div class="d-block text-center">
                <h3>루트 카테고리 생성하기</h3>
            </div> -->
            <form name="insertRootCategory" onsubmit="return false">
                <p><span class="font-weight-bold">{{ selectCategory.breadcrumb() }}</span></p>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" v-model="insertSelectCategory.text" placeholder="카테고리명을 입력하세요" aria-label="카테고리명을 입력하세요">
                    <div class="input-group-append">
                        <button class="btn btn-info" type="button" id="button-addon2" @click="insertRootCategory">추가하기</button>
                    </div>
                </div>
            </form>
        </b-modal>

        <!-- Modal -->
        <b-modal ref="move-category-modal" hide-footer title="카테고리 이동">
            <div class="content">
                <div class="row mb-3">
                    <div class="col-4 font-weight-bold">대상 카테고리</div>
                    <div class="col-8"><h3><span class="badge badge-light">{{ selectCategory.breadcrumb() }}</span></h3></div>
                </div>
                <div class="row">
                    <div class="col-4 font-weight-bold">이동 위치</div>
                    <div class="col-8">
                        <div class="row">
                            <div class="col-12 mb-3">
                                <select name="move_category" for="select_1" @change="selectCategory.move_select = 1" @change.stop="selectEvent">
                                    <option>::1차 카테고리를 선택하세요::</option>
                                    <option v-for="(item, index) in moveSelect1" :key="index" :value="item.value">{{ item.text }}</option>
                                </select>
                                <input type="radio" name="move_select" id="move_select_1" value="1"  v-model="selectCategory.move_select" />
                            </div>
                            <div class="col-12 mb-3">
                                <select name="move_category" id="select_2" @change="selectCategory.move_select = 2" @change.stop="selectEvent">
                                    <option>::2차 카테고리를 선택하세요::</option>
                                    <option v-for="(item, index) in moveSelect2" :key="index" :value="item.value">{{ item.text }}</option>
                                </select>
                                <input type="radio" name="move_select" id="move_select_2" value="2" v-model="selectCategory.move_select" />
                            </div>
                            <div class="col-12 mb-3">
                                <select name="move_category" id="select_3" @change="selectCategory.move_select = 3" @change.stop="selectEvent">
                                    <option>::3차 카테고리를 선택하세요::</option>
                                    <option v-for="(item, index) in moveSelect3" :key="index" :value="item.value">{{ item.text }}</option>
                                </select>
                                <input type="radio" name="move_select" id="move_select_3" value="3" v-model="selectCategory.move_select" />
                            </div>
                            <div class="col-12 mb-3">
                                <select name="move_category" id="select_4" @change="selectCategory.move_select = 4" @change.stop="selectEvent" >
                                    <option>::4차 카테고리를 선택하세요::</option>
                                    <option v-for="(item, index) in moveSelect4" :key="index" :value="item.value">{{ item.text }}</option>
                                </select>
                                <input type="radio" name="move_select" id="move_select_4" value="4" v-model="selectCategory.move_select" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success" @click="move">이동</button>
                    <button class="btn btn-danger">취소</button>
                </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
import $ from 'jquery'
import Quill from 'quill'
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import { ImageUpload } from 'quill-image-upload'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'
import commonJs from '@/assets/js/common.js'
import CategoryComponent from '@/components/category/Category.js'
// 이미지 업로드 등록시 함수 
import ImagesUploader from '@/assets/js/ImagesUploader.js'

Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);
Quill.register('modules/imageUpload', ImageUpload)

export default {
    mixins: [commonJs, ImagesUploader, CategoryComponent],
    data () {
        return {
            editorOption: {
                modules: {
                    toolbar: {
                        container:[
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'script': 'sub' }, { 'script': 'super' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'direction': 'rtl' }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'font': [] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'align': [] }],
                            ['clean'],
                            ['link', 'image']
                        ],
                        handlers: {
                            'image': function () {
                                document.getElementById('categorCommentHtmlImage').click()
                            }
                        }
                    }
                    ,
                    imageDropAndPaste: {
                        handler: this.categorCommentHtmlimageHandler
                    }
                },
                placeholder: '내용을 입력해주세요...'
            },
            insertSelectCategory: {
                parentSysId: 0,
                categoryLevel: 0,
                text: ''
            },
            selectCategory: {
                categoryLevel: 0,
                categorySysId: 0,
                categoryCode: '',
                parentSysId: 0,
                feeRate: 0,
                isHide: true,
                title: '',
                breadcrumb: function () {
                    if (this.categories.length === 0) {
                        return ''
                    } else if (this.categories.length === 1) {
                        return this.categories[0].name
                    } else {
                        var tempTitle = new Array()
                        for (var i = 0 ; i < this.categories.length ; i++) {
                            tempTitle[i] = this.categories[i].name
                        }
                        return tempTitle.join(' > ')
                    }
                },
                topDesignHTML: '',
                isApplyChildCategory: false,
                move_select: 0,
                categories:[]
            },
            moveSelect1: [],
            moveSelect2: [],
            moveSelect3: [],
            moveSelect4: [],
            moveSelect5: []
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        // 카테고리 이동 시작
        showMoveModelCategory: function (item){
            this.setSelectCategory(item)
            this.axiosGetRequest('/api/v1/categories',{categoryLevel: 1}, this.modelInitialSelectBox)
            this.$refs['move-category-modal'].show()
        },
        modelInitialSelectBox: function (res) {
            var data = res.data.jsonData.categories
            this.moveSelect1.splice(0,1)
            for(var i = 9 ; i < data.length ; i ++) {
                this.moveSelect1.push({value: data[i].categorySysId, text: data[i].name})
            }
        },
        selectEvent: function(event) {
            var param = {
                parentSysId: event.target[event.target.selectedIndex].value,
                categoryLevel: (this.selectCategory.move_select + 1)
            }
            this.axiosGetRequest('/api/v1/categories', param, this.moveCategorySelectSuccess)
        },
        moveCategorySelectSuccess: function (res) {
            var data = res.data.jsonData.categories
            var categoryLevel = data[0].categoryLevel
            for (var i = 0 ; i < data.length ; i ++) {
                this.$data['moveSelect'+ categoryLevel].push({value: data[i].categorySysId, text: data[i].name})
            }
        },
        // 카테고리 이동 끝
        // 카테고리 이동이동
        // eslint-disable-next-line no-unused-vars
        move: function (event){
            var id = $('#move_select_'+this.selectCategory.move_select)
            console.log(id)
            var param = {
                categorySysId: this.selectCategory.categorySysId,
                categoryLevel: this.selectCategory.categoryLevel,
                categoryCode: this.selectCategory.categoryCode,
                name: this.selectCategory.text,
                parentSysId: ''
            }
            console.log(param)
        },
        // 이미지 에디터에서 올림
        categorCommentHtmlimageHandler: function (imageDataUrl, type){
            var ext = type.split('/')
            var imageExt = ext[1]
            var blob = this.dataURItoBlob(imageDataUrl)
            var file = this.blobToFile(blob, 'temp.'+imageExt)
            var cursorLocation = this.$refs.editorOptionRef.quill.getSelection(true) 
            this.onEditorImagesUploaderEvent(file, this.$refs.editorOptionRef.quill, cursorLocation.index)
        },
        init: function () {
            const param = {
                categoryLevel: 1
            }
            this.axiosGetRequest('/api/v1/categories', param, this.insertCategoryFn)
        }
    },
    components: {
        quillEditor
    }
}
</script>
<style>
    /* 카테고리 item list */
    .t_category.category{
        
    }
    .t_category.category tr{
        height: 60px;
    }
    .t_category.category tr th {
        background: #f5f5f5;
        font-weight: 700;
    }
    .t_category .category-item {
        margin-left: 5px; 
        margin-right: 5px
    }
    .t_category .category-item .close-btn{
        position: relative;
        top: -8px;
        right: -8px;
        margin: -8px;
    }
    .t_category .category-item .modify-btn{
        position: relative;
        top: 11px;
        right: -8px;
        margin: -8px;
    }
    .t_category .category-item .item{
        padding: 8px 12px;
    }
    .add-btn{
        margin-bottom: 6px;
    }
    #vueEditor{
        height: 200px;
    }
</style>
