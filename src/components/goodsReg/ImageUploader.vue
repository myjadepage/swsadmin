<template>
  <div>
    <div class="tr mgt5">
      <b-button variant="info" size="sm" v-on:click="addImagesRow">이미지 추가</b-button>
      <!-- <b-button variant="danger" size="sm" @click="removeImagesRow">이미지 삭제</b-button> -->
    </div>
    <div id="todo-list-example">
      <b-row cols="12" class="mb-1" v-for="(item, index) in images" :key="index">
        <b-col cols="4" style="padding-right:0px">
          <span style="width:20px">{{index + 1}}.</span>&emsp;
          <span>
            <b-input-group size="sm">
              <b-form-input disabled squared placeholder="썸네일 업로드" style="width: 240px" v-model="item.imageurl" ></b-form-input>
              <b-input-group-append>
                <b-button size="sm" squared text="Button" @click="onImageObjOpenFn('imageObject'+index)">이미지 업로드</b-button>
              </b-input-group-append>
            </b-input-group>
          </span>
          <input type="file" :id="'imageObject'+index" accept="image/jpeg, image/png, image/jpg, image/gif" style="display:none" @change="$emit('imageUploader',$event, {item: item, field: 'imageurl', imageDir: '/product/image/0/'+productData.sellerSysId})"/>
        </b-col>
        <b-col class="px-0">
          <b-button variant="light" @click="images.splice(index, 1)" size="sm" style="height:23px">이미지 삭제</b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
export default {
  props: ["images", "productData"],
  methods: {
    addImagesRow: function() {
      if (this.images.length >= 10) {
        alert("10개이상 이미지를 추가할수 없습니다.");
        return false;
      } else {
        this.imagesCounter++;
        this.images.push({
          imageurl: ""
        });
      }
    },
    onImageObjOpenFn: function(id) {
      document.getElementById(id).click();
      return true;
    }
  }
};
</script>