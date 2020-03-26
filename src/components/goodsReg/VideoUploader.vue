<template>
  <div>
    <div class="tr mgt5">
      <b-button variant="info" size="sm" @click="addVideoRow">영상 추가</b-button>
    </div>
    <b-row cols="12" v-for="(item, index) in videos" :key="item.id">
      <template v-if="item.procTypeCode !== 4">
        <b-col cols="3" class="mb-1"  style="padding-right:0px">
          <span style="width:20px">{{index + 1}}.</span>
          <select style="width: 120px" v-model.number="item.mediaTypeCode">
            <option value="1">메인</option>
            <option value="2">언박싱</option>
            <option value="3">사용법</option>
            <option value="4">후기</option>
            <option value="5">이미지</option>
          </select>
          <input
            type="text"
            v-model="item.title"
            class="text_input"
            placeholder="영상 타이틀"
            maxlength="50"
            style="width:100%; max-width:200px"
          />
        </b-col>
        <b-col cols="2" class="px-1">
          <b-input-group size="sm">
            <b-form-input disabled squared placeholder="영상 업로드" v-model="item.videoTitle"></b-form-input>
            <b-input-group-append>
              <b-button
                size="sm"
                squared
                text="Button"
                @click="onObjOpenFn(`videoObject`+index)"
              >영상 찾기</b-button>
            </b-input-group-append>
          </b-input-group>
          <input
            type="file"
            name="optionalVideoUrl"
            :id="`videoObject`+index"
            style="display: none"
            accept="video/*"
            @change="onSingleVideoUploaderEvent(index, item, $event)"
          />
        </b-col>
        <b-col cols="3">
          <b-input-group size="sm">
            <b-form-input disabled squared placeholder="썸네일 업로드" v-model="item.thumnailUrl"></b-form-input>
            <b-input-group-append>
              <b-button
                size="sm"
                squared
                text="Button"
                v-on:click="onObjOpenFn('thumbmailObject'+index)"
              >썸네일 업로드</b-button>
            </b-input-group-append>
            <input
              type="file"
              style="display: none"
              :id="'thumbmailObject'+index"
              accept="image/*"
              @change="$emit('imageUploader',$event, {item: item, field: 'thumnailUrl'})"
            />
          </b-input-group>
        </b-col>
        <b-col cols="1" class="px-1">
          <b-button variant="light" v-on:click="removeVideoRow(item)" size="sm">영상 삭제</b-button>
        </b-col>
        <b-col cols="3">
          <template v-if="item.progressMax > 0">
            <b-progress :max="item.progressMax" class="mt-2">
              <b-progress-bar
                variant="success"
                class="text-light"
                :value="item.progressValue"
                :label="`${((item.progressValue/ item.progressMax) * 100).toFixed(1)}%`"
              ></b-progress-bar>
            </b-progress>
          </template>
        </b-col>
      </template>
    </b-row>
  </div>
</template>
<script>
import Axios from "axios";
export default {
  data() {
    return {
      selectedindex: ""
    };
  },
  props: ["videos", "productData"],
  methods: {
    addVideoRow: function() {
      if (this.videos.length >= 10) {
        alert("10개이상 영상을 추가할수 없습니다.");
        return false;
      } else {
        this.videos.push({
          mediaTypeCode: 1,
          mediaId: '',
          title: '',
          videoTitle: '',
          progressValue: 0,
          progressMax: 0,
          thumnailUrl: '',
          procTypeCode: 2
        });
      }
    },
    onObjOpenFn: function(id) {
      document.getElementById(id).click();
      return true;
    },
    removeVideoRow: function(item) {
      item.procTypeCode = 4
    },
    async onSingleVideoUploaderEvent(index, obj, event) {
      this.selectedindex = index;

      var targetObj = event.target;
      var formData = new FormData();
      formData.append("file", targetObj.files[0]);
      let result = await Axios.request({
        method: "post",
        url: "https://api.midibus.kinxcdn.com/v1/upload/450",
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Mbus-Token": "D51D768EDB699F30ABBD16569FB07A630FED100A9D7AFF899EA24079F9C5BBECFF28C464E1AD49E6748BB409D9A4F0A227040A68503B771A8B78953AFAD4AA5B"
        },
        onUploadProgress: function (event) {    
          this.videos[this.selectedindex].progressValue = event.loaded;
          this.videos[this.selectedindex].progressMax = event.total;
        }.bind(this),
        data: formData
      })
        .then(function(res) {
          return res;
        })
        .catch(function(err) {
          console.log(err);
        });
      obj.videoTitle = targetObj.files[0].name;
      obj.mediaId = result.data.mediaId;
      alert("업로드가 완료되었습니다.");
      return true;
    }
  }
};
</script>