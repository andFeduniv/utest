<?php
/**
 * Created by PhpStorm.
 * User: andfe
 * Date: 2/18/2016
 * Time: 3:27 PM
 */

namespace app\models;


use yii\db\ActiveRecord;

class Todo extends ActiveRecord  {

  public function rules()
  {
    return [
      [['task'], 'required'],
      ['done', 'boolean']
    ];
  }

  public static function tableName()
  {
      return 'todo';
  }
} 