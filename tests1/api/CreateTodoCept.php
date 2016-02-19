<?php 
$I = new ApiTester($scenario);

$I->wantTo('perform actions and see result');
$I->wantTo('create a user via API');
$I->haveHttpHeader('Content-Type', 'application/x-www-form-urlencoded');
$I->sendPOST('/todos', ['task' => 'davert' ]);
$I->seeResponseCodeIs(201);
$I->seeResponseIsJson();
$I->seeResponseContains('"task":"daverdfdfdft"');