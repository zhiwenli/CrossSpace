
var HttpForm = {
  MAX_FILE_SIZE: 200*1024*1024,

  sendPostForm: function(formId, targetUrl, callback){
    var form = new FormData(document.getElementById(formId));
    this.sendPostFormObj(form, targetUrl, callback);

    return false;
  },

  sendPostFormObj: function(form, targetUrl, callback){
    console.log("send a Ajax HTTP");

    form = this.formDataFilter(form);

    $.ajax({
      type: 'POST',
      url: targetUrl,
      data: form,
      contentType: false, //取消默认值，使用XMLHttpRequest自动赋值（传文件）
      processData: false, //避免Ajax对formdata的格式化，交由XMLHttpRequest处理（传文件）
      dataType: 'json', //返回的数据格式
      success: callback,
      error: function(XMLHttpRequest){
          console.error('服务器响应异常：' + XMLHttpRequest.status);
          if (XMLHttpRequest.status == 200) {
            console.warn('请检查文件中文编码格式,推荐uft8');
          }
      }
    });

    return false;
  },

  //ＷＡＲＮＮＩＮＧ！ 待改进
  //该函数执行部分在各种移动端均爆出错误，因此使用try catch finally
  //过滤掉formData中超过限制大小的文件
  formDataFilter: function(formdata){
    try{
      var arr = formdata.keys();
      for (var key of arr){
        var value = formdata.get(key);

        if (typeof(value) === 'object' && value.size > this.MAX_FILE_SIZE) {
          formdata.delete(key);
          console.warn('文件大小超过预期，已丢弃该文件，', value.name, value.size, 'KB');
        }
      }
    }catch(err){
      console.err('表单文件过滤函数出错，formDataFilter()');
    }finally{
      return formdata;
    }
  },

}