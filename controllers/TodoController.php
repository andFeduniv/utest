<?php
/**
 * Created by PhpStorm.
 * User: andfe
 * Date: 2/18/2016
 * Time: 3:25 PM
 */

namespace app\controllers;


use yii\rest\ActiveController;
use yii\web\Response;


class TodoController extends ActiveController {

  public $modelClass = 'app\models\Todo';
  public function behaviors()
  {
    $behaviors = parent::behaviors();
    $behaviors['contentNegotiator']['formats'] = [];
    $behaviors['contentNegotiator']['formats']['application/json'] = Response::FORMAT_JSON;
   // print_r($behaviors);die;
    return $behaviors;
  }
} 