<?php
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