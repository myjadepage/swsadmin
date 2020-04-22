export default {
    data() {
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
            }
        }
    }
}