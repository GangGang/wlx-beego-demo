/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	

	var list_history_class;

	var now_class;

	var head_mol;

	function get_student_souce(url) {

	    $.getJSON( url,
	        function(jsonObject) {

	            if (jsonObject.code == 200)
	            {

	                head_mol = new Object();

	                list_history_class = new Array;


	                now_class = new Array;


	                var souce_data = jsonObject.data.webStudentSimple;//stu_detail

	                head_mol.student_name = souce_data.stuName;

	                head_mol.student_age = souce_data.stuAge;

	                head_mol.student_parent_name = souce_data.parentsName ;

	                head_mol.phonenumber =  souce_data.parentsTel;

	                head_mol.address = souce_data.parentsAddress;

	                // head_mol.level_left =

	                // head_mol.level_right =


	                for(var i = 0 ; i < jsonObject.stu_detail.data.webGradeTeacherList.length ; i++){


	                    var mol_class =  new Object();


	                    mol_class.gradeTitle = jsonObject.data.webGradeTeacherList[i].gradeTitle;

	                    mol_class.teacherName = jsonObject.data.webGradeTeacherList[i].teacherName;

	                    mol_class.frequency = jsonObject.data.webGradeTeacherList[i].frequency;


	                    now_class.push(mol_class);


	                }


	                for(var j = 0 ; j < jsonObject.data.webGradeTeacherHistoryList.length ; j++){

	                     var mol_history_class =  new Object();

	                    mol_history_class.gradeTitle = jsonObject.data.webGradeTeacherHistoryList[j].gradeTitle;

	                    mol_history_class.teacherName = jsonObject.data.webGradeTeacherHistoryList[j].teacherName;

	                    mol_history_class.frequency = jsonObject.data.webGradeTeacherHistoryList[j].cumulative;


	                    list_history_class.push(mol_history_class);


	                }


	                 setHeadSouce(head_mol);

	                class_message_ui(now_class,list_history_class);



	            }else {

	                alert(jsonObject.code+'');
	            }

	        });

	}


	function get_souce(jsonObject) {

	    // head_mol = new Object();

	    list_history_class = new Array;


	    now_class = new Array;


	    // var souce_data = jsonObject.stu_detail.webStudentSimple;//stu_detail
	    //
	    // head_mol.student_name = souce_data.stuName;
	    //
	    // head_mol.student_age = souce_data.stuAge;
	    //
	    // head_mol.student_parent_name = souce_data.parentsName ;
	    //
	    // head_mol.phonenumber =  souce_data.parentsTel;
	    //
	    // head_mol.address = souce_data.parentsAddress;

	    // head_mol.level_left =

	    // head_mol.level_right =


	    for(var i = 0 ; i < jsonObject.stu_detail.webGradeTeacherList.length ; i++){


	        var mol_class =  new Object();


	        mol_class.gradeTitle = jsonObject.stu_detail.webGradeTeacherList[i].gradeTitle;

	        mol_class.teacherName = jsonObject.stu_detail.webGradeTeacherList[i].teacherName;

	        mol_class.frequency = jsonObject.stu_detail.webGradeTeacherList[i].frequency;


	        now_class.push(mol_class);


	    }


	    for(var j = 0 ; j < jsonObject.stu_detail.webGradeTeacherHistoryList.length ; j++){

	        var mol_history_class =  new Object();

	        mol_history_class.gradeTitle = jsonObject.stu_detail.webGradeTeacherHistoryList[j].gradeTitle;

	        mol_history_class.teacherName = jsonObject.stu_detail.webGradeTeacherHistoryList[j].teacherName;

	        mol_history_class.frequency = jsonObject.stu_detail.webGradeTeacherHistoryList[j].cumulative;


	        list_history_class.push(mol_history_class);


	    }



	}



	// function setHeadSouce(head_mol) {
	//
	//     $('#studParentHead .student_name').text(head_mol.student_name);
	//
	//     $('#studParentHead .agetext').text('--'+head_mol.student_age+'岁');
	//
	//     $('#studParentHead .parent_name').text(head_mol.student_parent_name);
	//
	//     $('#studParentHead .parent_phone_number').text(head_mol.phonenumber);
	//
	//     $('#studParentHead .address_school').text(head_mol.address);
	//
	// }


	function class_message_ui(class_souce,class_history) {


	    // $('.history_message').remove();


	    $(' .learningClass_message').remove();



	    for(var j = 0 ; j < now_class.length ; j++){



	        var class_ui =     $('<tr style="font-size: 16px;height:70px;font-weight: 100">' +
	            '<th class="learningClass_message">'+ now_class[j].gradeTitle +'</th>' +
	            '<th class="learningClass_message">'+ now_class[j].teacherName +'</th>' +
	            '<th class="learningClass_message">'+ now_class[j].frequency +'</th>' +
	            '</tr>')

	        $('#learningClass table tbody').append(class_ui);

	    }


	    for(var i = 0 ;  i < class_history.length ; i++){

	      var history_ui =     $('<tr style="font-size: 16px">' +
	                            '<th class="history_message">'+ class_history[i].gradeTitle +'</th>' +
	                            '<th class="history_message">'+ class_history[i].teacherName +'</th>' +
	                            '<th class="history_message">'+ class_history[i].frequency +'</th>' +
	                            '</tr>')


	      $('#historyClass table tbody').append(history_ui);


	    }

	    $('#learningClass table').css('height' , class_history.length *4 +'px');
	    $('#historyClass table').css('height' ,  class_history.length *4 +'px');

	}


	$().ready(function () {

	    // /orgs/'+json_souce.org_id+'/schools/'+json_souce.school_id+'/orders/order_submit/'+stu_id+'



	    var jsonObject = JSON.parse($('#jsonObject').val());

	    var stu_id = jsonObject.stu_detail.webStudentSimple.stuId;



	    $('.addbut').click(function () {


	        window.location = '/orgs/'+jsonObject.org_id+'/schools/'+jsonObject.school_id+'/orders/order_submit/'+stu_id+'/'

	    });


	    get_souce(jsonObject);

	    // setHeadSouce(head_mol);

	    class_message_ui(now_class,list_history_class);

	});





/***/ }
/******/ ]);