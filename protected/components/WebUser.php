<?php

class WebUser extends CWebUser
{
    public $allowAutoLogin = true;
    public $loginRequiredAjaxResponse = 'Login Required!';

    public function toJSON() {
        return CJSON::encode(array(
            'username' => $this->name,
            'id' => $this->id,
        ));
    }
}
