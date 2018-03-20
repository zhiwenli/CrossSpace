<?php
define('CURRENT_PHP_PATH', '/subSurface/controll/');
define('PUBLIC_USER_IMG_PATH', '../data/tmp/');
define('MAX_FILE_SIZE', 200*1024*1024); //200MB

$rf = new ResponseFile();

$content = $rf->saveFiles();//echo "string---";var_dump($content);
echo json_encode($content);

/**
* desc-构造返回结果,答复文件上传动作
* author-www.zhiwenli.com
* at-2017-10-26 09:44:39
*/
class ResponseFile{
  private $response;

  //构造函数
  public function __construct(){
    $status = array(false, 'msg-success');
    $response['status'] = $status;
    $response['content'] = array('fileUrl'=>'', 'data'=>array());
  }

  //保存文件，检测文件是否上传成功及文件类型
  public function saveFiles(){
    $sf = new SaveFiles();
    //echo json_encode($sf->saveFile());
    $filePath = $sf->saveFile();

    if($filePath['filePath'] == false){
      $response['status'][0] = false;
      $response['status'][1] = $filePath['msg']; //error message
      return $response;
    }else{
      //文件保存成功
      $filePath['filePath'] = CURRENT_PHP_PATH.$filePath['filePath'];

      $suffix = substr($filePath['filePath'], strrpos($filePath['filePath'], '.') + 1);
      $suffix = strtoupper($suffix);
      if($suffix == "CSV"){
        $content = $this->csv2object($filePath['filePath']);
        $response['status'][0] = true;
        $response['status'][1] = 'ObjectArray'; //result type
        $response['content']['data'] = $content;
        $response['content']['fileUrl'] = $filePath['filePath'];
      }else{
        $response['status'][0] = true;
        $response['status'][1] = 'FilePath'; //result type
        $response['content']['fileUrl'] = $filePath['filePath'];
      }
      return $response;
    }
  }

  //csv to object
  public function csv2object($csvFilePath){
    $myfile = fopen($csvFilePath, "r") or die("Unable to open file!");
    $content = array();

    while(!feof($myfile)) {
      $rowStr = fgets($myfile); 
      $rowStr = substr($rowStr, 0, -2); //移除换行符\r\n
      $row = explode(",", $rowStr); //str to arr
      $content[] = $row;
    }

    fclose($myfile);

    array_pop($content); //CSV最后一行为空，移除

    return $content;
  }

}

/**
* desc-接收上传的文件
* author-www.zhiwenli.com
* at-2017-7-16 16:15:43
*/
class SaveFiles{
  //如果检测到上传了文件，则存储文件并设置对应字段为文件路径
  public function saveFile(){
    $resp['filePath'] = false;
    foreach ($_FILES as $key => $value) {
      if($value['size'] == 0 || $value['size'] > MAX_FILE_SIZE){
      	if ($value['error'] > 0) {
          $resp['msg'] = "Error: " . $value["error"];
          return $resp;
      	}
        continue;
      }
      $value['name'] = self::createUploadFileName($value['name']);          //重命名

      $resp['filePath'] = PUBLIC_USER_IMG_PATH.$value["name"];
      move_uploaded_file($value["tmp_name"], $resp['filePath']);
    }
    return $resp;
  }

  //随机字符串发生器
  public static function getRandChar($length=8){
   $str = null;
   $strPol = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
   $max = strlen($strPol)-1;

   for($i=0;$i<$length;$i++){
    usleep(rand(500,15000));
    $str.=$strPol[rand(0,$max)];//rand($min,$max)生成介于min和max两个数之间的一个随机整数
   }
   return $str;
  }

  //修改文件名字符串中的文件名（不影响后缀）
  public static function createUploadFileName($fileName){
    //return time().'_'.self::getRandChar().'.'.substr($fileName, strrpos($fileName, '.') + 1);
    return time().'_'.$fileName;
  }
}