/*.....................................
  Validator
......................................*/

var VHX = VHX || {};

VHX.Validate = {};

/* required
......................................*/
VHX.Validate.required = function(required) {
  var obj = {
    val: required.length ? required.val() : required,
    key: 'required',
    errors: false,
    el: required.length ? required : null
  };

  if (!obj.val) {
    obj.errors = true;
    obj.message = 'This field is required.';
  }

  return obj;
};

/* title
......................................*/
VHX.Validate.title = function(title) {
  var obj = {
    val: title.length ? title.val() : title,
    key: 'title',
    errors: false,
    el: title.length ? title : null
  };

  if (!val) {
    return 'Please enter a project title.';
  }

  if ($.inArray(val.toLowerCase(), SUBDOMAIN_AND_HANDLE_BLACKLIST) !== -1) {
    return 'This is a reserved project title. Please enter a new title.';
  }

  return obj;
};

/* email
......................................*/
VHX.Validate.email = function(email) {
  var obj = {
    val: email.length ? email.val() : email,
    key: 'email',
    errors: false,
    el: email.length ? email : null
  };

  var valid_email = new RegExp('^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

  if (!valid_email.test(obj.val)) {
    obj.errors = true;
    obj.message = 'Please enter a valid email address.';
  }

  return obj;
};

/* password
......................................*/
VHX.Validate.password = function(password) {
  var obj = {
    val: password.length ? password.val() : password,
    key: 'password',
    errors: false,
    el: password.length ? password : null
  };

  if (!obj.val) {
    obj.errors = true;
    obj.message = 'Please enter a password.';
  }

  if (val.length < 6) {
    obj.errors = true;
    obj.message = 'Please enter a password longer than 5 characters.';
  }

  return obj;
};

/* select
......................................*/
VHX.Validate.select = function(select) {
  var obj = {
    val: select.length ? select.val() : select,
    key: 'select',
    errors: false,
    el: select.length ? select : null
  };

  if (!obj.val) {
    obj.errors = true;
    obj.message = 'Please make a selection.';
  }

  return obj;
};

/* radio
......................................*/
VHX.Validate.radio = function(radio) {
  var return_obj = {
    key: 'radio',
    errors: true,
    el: radio.length ? radio : null
  };

  if (radio.length) {
    if (!radio.is(':checked')) {
      return_obj.message = 'Please make a selection.';
      return return_obj;
    }
  }

  return obj;
};
