   var springURL = "http://192.168.1.100:8080";
    var nodeDarkzURL = "http://192.168.1.108:3000";
	var DispenseURL = "http://127.0.0.1:8080";
// create the module and name it myApp
	var mainapp = angular.module('mainapp', ['ngRoute','xlsx-model']);

	// configure our routes
	mainapp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/dashboard.html',
				// controller  : 'mainController'
			})

			// route for the stock page
			.when('/stock', {
                templateUrl: 'pages/stock.html',
                controller: 'stockController'
            })
			.when('/expiredStock', {
                templateUrl: 'pages/expiredStock.html',
                controller: 'expiredStockController'
            })

	// route for the contact page
	.when('/batch', {
		templateUrl : 'pages/batch.html',
		controller  : 'batchController'
	})
	.when('/drug', {
		templateUrl : 'pages/drugs.html',
		controller  : 'drugController'

	})
	.when('/viewdrug', {
		templateUrl : 'pages/drugview.html',
		controller  : 'drugController'

	})
	//----------------------------------------SAMEERA ROUTING-------------------------	
	// route for the patient page
        .when('/patient', {
            templateUrl : 'pages/registerPatient.html',
            controller  : 'dispensePatient'
        })
        .when('/prescription', {
            templateUrl : 'pages/addPrescription.html',
            controller  : 'dispensePrescription'

        })
        .when('/doctor', {
            templateUrl : 'pages/registerDoctor.html',
            controller  : 'dispenseDoctor'

        })
        .when('/dispense', {
            templateUrl : 'pages/dispensePrescription.html',
            controller  : 'dispenseDrugs'

        })
        .when('/history', {
            templateUrl : 'pages/editPrescription.html',
            controller  : 'historyDispenseDrugs'

        })
        //..............................................umani............................................................
        // route for the add patient page
        .when('/addPatients', {
            templateUrl: 'pages/new-patient.html',
            controller: 'patientController-2'
        })
	.when('/', {
            templateUrl: '../login.html',
//             controller: 'patientController-2'
        })
	.when('/register', {
            templateUrl: '../signup.html',
//             controller: 'patientController-2'
        })
        // route for the view patient page
        .when('/patients', {
            templateUrl: 'pages/patients.html',
            // controller:'patientController'
        });
			
	});
//.....................................................................................umani...............................
mainapp.controller('patientController-1', function ($scope, $http) {

//.............................................................read patient................................................
//................................................ change suitable port....
    $http.get("http://127.0.0.1:3000/api/patient/get-patients").then(function (response) {
        $scope.patientTable = response.data;
    });

});

// create the controller and inject Angular's $scope
mainapp.controller('patientController-2', function ($scope, $http) {

//...............................................................add patient..............................................
    // $scope.formData.date=new Date().toDateInputValue();
    $scope.addPatient = function (data) {
        //console.log("CAME TO ADD PATIENT PPPPPPPPPPPPPPp");
        console.log($scope.formData);
        console.log(localStorage.getItem('id_token'));
        $scope.formData.date="12/12/2017";
        $http({
            method: "POST",
            url: "http://127.0.0.1:3000/api/patient/create-patient-test",
            data: $scope.formData,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                //for authanticaion
                'Authorization':localStorage.getItem('id_token')
            }
        }).success(function (data, status, headers, config) {

            return $scope.alertSubmit = true;


        }).error(function (data, status, headers, config) {

            return $scope.alertSubmit = false;

        });

    }

    });

// //...................................................................


	// create the controller and inject Angular's $scope
	mainapp.controller('drugController', function($scope, $http) {

	  $http.get(nodeDarkzURL+"/api/drug").then(function (response) {
	  $scope.myDrug = response.data;
 
  
	 
	  });
	  $scope.updateDrug = function(data){

	  	var drugPrice=angular.element(document.getElementById())
		console.log(data);

	  };

	$scope.addDrug = function (data) {  
  
        $http({  
            method: "POST",  
            url: nodeDarkzURL+"/api/drug",  
            data: $scope.formData,  
            headers: {  
                'Content-Type': 'application/json'  
            }  
        }).success(function(data, status, headers, config) { 
           
            	return $scope.alertSubmit = true;

             
        }).error(function(data, status, headers, config) { 

        		return $scope.alertSubmit = false;
           
        });  
  
    }  

	});

	mainapp.controller('xlsxCtrl', ['$scope', function($scope) {
  // Nothing to do here :)
	}]);


  mainapp.controller('importCtrl', ['$scope', '$http', function ($scope, $http) {  
  
    $scope.selectedFile = null;  
    $scope.msg = "";  
  
  
    $scope.loadFile = function (files) {  
  
        $scope.$apply(function () {  
  
            $scope.selectedFile = files[0];  
            if($scope.selectedFile != null && typeof $scope.selectedFile !=  'undefined'){
            	$scope.checkFile = true;
            }
  
        })  
  
    }  
  
        $scope.handleFile = function () {  
  
        var file = $scope.selectedFile;  
  
        if (file) {  
  
            var reader = new FileReader();  
  
            reader.onload = function (e) {  
  
                var data = e.target.result;  
  
                var workbook = XLSX.read(data, { type: 'binary' });  
  
                var first_sheet_name = workbook.SheetNames[0];  
  
                var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);  
  
                //console.log(excelData);  
  
                if (dataObjects.length > 0) {  
  
                      
                    $scope.save(dataObjects);  
  
  
                } else {  
                    $scope.msg = "Error : Something Wrong !";  
                }  
  
            }  
  
            reader.onerror = function (ex) {  
  
            }  
  
            reader.readAsBinaryString(file);  
        }  
        angular.element("input[type='file']").val(null);

            	$scope.checkFile = false;
            
    }  
  
      
    $scope.save = function (data) {  
  
        $http({  
            method: "POST",  
            url: nodeDarkzURL+"/api/drug",  
            data: JSON.stringify(data),  
            headers: {  
                'Content-Type': 'application/json'  
            }  
  
        }).success(function(data, status, headers, config) { 
           
            	if(data.success == false){
            		return $scope.alert = false;
            	}else{
            		return $scope.alert = true;
            	}
             
        }).error(function(data, status, headers, config) { 

        		return $scope.alert = false;
           
        });  
  
    }  
  
}]);  

		mainapp.controller('batchController', function($scope, $http) {

	$scope.newQTY = 0;

  $http.get(nodeDarkzURL+"/api/drugCategory").then(function (response) {
  $scope.myDrugCategory = response.data;
 
  
	 
	  });

  $http.get(nodeDarkzURL+"/api/batch/last").then(function (response) {

  $scope.thisMode = [];
  $scope.thisMode.batchNumber = response.data;

 
  console.log($scope.thisMode.batchNumber);
	 
  });

  $scope.pressDType=[

 		 {Dtype:"Cartoons"},

		 {Dtype:"Bottles"}

  ];



  $scope.secondGET = function () {  
  	
  	$http.get(nodeDarkzURL+"/api/drug/category/"+$scope.thisMode.cat).then(function (response) {
  		
	      $scope.batchData = response.data;

  });
  }

// $scope.updateQTY = function () {  

// 	if()

// }


$scope.drugpriceGET = function () {  
  	
  	$http.get(nodeDarkzURL+"/api/drug/drugname/"+$scope.thisMode.Dname).then(function (response) {
	      $scope.priceData = response.data[0];

  		// alert($scope.priceData);

  });
  }

  $scope.calcLiquid= function () {

  	$scope.totalQty=$scope.qty.cartoon* $scope.qty.bottle;

  }
 $scope.calcBottles= function () {

	$scope.totalQty= ($scope.qty.cartoon * $scope.qty.bottle )* $scope.qty.tabPerBottle;

 }
 $scope.calcCard= function () {

	$scope.totalQty= ($scope.qty.cartoon * $scope.qty.bottle) * $scope.qty.tablet;
 
 }
  $scope.calcBottleLiqud= function () {

	$scope.totalQty=$scope.qty.cartoon* $scope.qty.bottle;
 
 }
  $scope.calcCartoonTab= function () {

	$scope.totalQty=($scope.qty.cartoon* $scope.qty.card)*$scope.qty.tablet;
 
 }


$scope.addBatch= function () {  


  // console.log(data);
  var data=[{
	  	"batchNumber":$scope.thisMode.batchNumber,
	  	"drugPrice":$scope.priceData.drugPrice,
	  	"drugName":$scope.thisMode.Dname,
	  	"quantity":$scope.totalQty,
	  	"manufacturerDate":$scope.thisMode.manufacturerDate,
	  	"exprieDate":$scope.thisMode.exprieDate
  	}];

  	// console.log(data);
  	// alert(data);

        $http({  
            method: "POST",  
            url: nodeDarkzURL+"/api/batch",  
            data: data,  
            headers: {  
                'Content-Type': 'application/json'  
            }  
        }).success(function(data, status, headers, config) { 
           console.log(data);
           console.log("001");
            	return $scope.alertSubmit = true;

             
        }).error(function(data, status, headers, config) { 

        		return $scope.alertSubmit = false;
           
        });  

  var stockData=[{
	  	
	  	"drugPrice":$scope.priceData.drugPrice,
	  	"drugCategory":$scope.thisMode.cat,
	  	"drugType":$scope.drugType,
	  	"drugName":$scope.thisMode.Dname,
	  	"drugQuantity":$scope.totalQty,
	  	"expDate":$scope.thisMode.exprieDate
  	}];
    

        $http({  
            method: "POST",  
            url: springURL+"/api/pharmacy/stock",  
            data: stockData,  
            headers: {  
                'Content-Type': 'application/json'  
            }  
        }).success(function(data, status, headers, config) { 
           console.log(data);
           console.log("001");
            	return $scope.alertSubmit = true;

             
        }).error(function(data, status, headers, config) { 

        		return $scope.alertSubmit = false;
           
        });  
  
    	}  	  

	}); 



    //=============================================CHAMINDU CONTROLLER -======================


    mainapp.controller('stockController', function($scope, $http) {

        $scope.isMailClicked = false;
        firstGET(secondGET);
   //============================================= SEND EMAIL HANDLER ======================

        $scope.sendOrderMail = function(selectedRow) {

            $scope.mailDrugCategory = selectedRow.drugCategory;
            $scope.mailDrugName = selectedRow.drugName;
            $scope.mailDrugPrice = selectedRow.drugPrice;
            $scope.mailDrugQuantity = selectedRow.drugQuantity;
            $scope.isMailClicked = true;

            console.log($scope.mailDrugCategory);



        };


        $scope.sendEmailOrder = function(selectedRow) {


            $scope.isMailClicked = false;
        }



 //============================================= LOAD STOCK DETAILS TO TABLE HANDLER ======================
        function firstGET(callback) {


            $http.get(springURL+"/api/pharmacy/stock").then(function(response) {
                $scope.stockTable = response.data;
                $scope.isMailClicked = false;

                callback(updateDangerLevel)

            });



        };


        function secondGET(callback) {


            $http.get(nodeDarkzURL+"/api/drug").then(function(response) {
                $scope.dangerDetails = response.data;

                callback();


            });




        };


//============================================= COMPARE STOCK WITH DANGER LEVEL VALIDATION ======================

        function updateDangerLevel() {


            for (var i = 0; i < $scope.stockTable.length; i++) {


                for (var r = 0; r < $scope.dangerDetails.length; r++) {

                    if ($scope.dangerDetails[r].drugName == $scope.stockTable[i].drugName) {

                        if ($scope.dangerDetails[r].dangerLevel >= $scope.stockTable[i].drugQuantity) {

                            $scope.stockTable[i].reorderAlert = "danger";
                            break;
                        }


                        if ($scope.dangerDetails[r].reorderLevel >= $scope.stockTable[i].drugQuantity) {

                            $scope.stockTable[i].reorderAlert = "reorder";
                            break;
                        }
                    }
                }

            }
        }






    });


//============================================= LOAD EXPIRED STOCK DETAILS TO TABLE HANDLER ======================
    mainapp.controller('expiredStockController', function($scope, $http) {
        updateExpireList();

        function updateExpireList() {

            $http.get(springURL+"/api/pharmacy/stock/expiredStock").then(function(response) {
                $scope.expiredStockTable = response.data;


                for (var i = 0; i < $scope.expiredStockTable.length; i++) {


                    $scope.expiredStockTable[i].expDate = new Date($scope.expiredStockTable[i].expDate).toUTCString().slice(4, 16);
                }

            });
        }

//============================================= DELETE EXPIRED STOCK FROM DATABASE HANDLER ======================

        $scope.deleteFromDB = function(selectedRow) {
            var result = confirm("Are you sure you want to delete this record?");



            $scope.selected = selectedRow._Id;

            if (result) {

                $http.delete(springURL+"/api/pharmacy/stock/deleteExpiredStock/" + $scope.selected).then(function(response) {
                    $scope.dangerDetails = response.data;


                    if ($scope.dangerDetails == 'true') {

                        updateExpireList();
                        $scope.alert = true;

                    } else {
                        alert('Error');

                    }


                });
            }




        };




    });



//-----------------------------------SAMEERA-------------------------------------

mainapp.controller('dispensePatient', ['$scope', '$http', function ($scope, $http) {



$scope.Quality = [{"Quality":"360p"},
                {"Quality":"720p"},
                {"Quality":"1080p"},
                {"Quality":"Higher"}];

$scope.Status = [{"Status":"Planing"},
                {"Status":"Downloading"},
                {"Status":"Done"}];


    $http.get(DispenseURL+"/api/movicenter/stock")
        .then(function (response) {
            $scope.movieList = response.data;
        });

   
    $scope.addMoive = function (data) {


var newData = [{
movieName : data.movieName,
quality : data.quality,
location :  data.location,
status : data.status

}];
        console.log(data);
        $http({
            method:"POST",
            url: DispenseURL+"/api/movicenter/stock",
            data: newData,
            headers:{
                'Content-Type':'application/json'
            }
        }).success(function (data, status, headers, config) {
            if(data.success === false){
                return $scope.alertSubmit = true;
            }
            else{
                $scope.movieList.push(data);
                               alert("Successfully Added!")
                return data.alertSubmit = false;
            }
        })

    }

    $scope.updatePatient = function (data) {
        var oldData= data;
        console.log($scope.Pat);
        $http.put(DispenseURL+"/api/patient/"+$scope.Pat.PatientID, data)
            .success(function (data, status, headers, config) {
                if(data.success=== false){
                    return $scope.alertSubmit = true;
                }
                else{
                    function findAndReplace(object, value, replaceValue) {
                        for (var x in object) {
                            if (object.hasOwnProperty(x)) {
                                if (typeof object[x] === 'object') {
                                    findAndReplace(object[x], value, replaceValue);
                                }
                                if (object[x] === value) {
                                    object["name"] = replaceValue;
                                    // break; // uncomment to stop after first replacement
                                    console.log("*******");
                                }
                            }
                        }
                    }
                    findAndReplace($scope.Patients, oldData, data);
                    console.log("Updated!");
                }
            })
            .error(function (data, status, header, config) {
                console.log("Error Updating!")
            });
    }

    $scope.removePatient = function (data) {
        var conf=confirm("Are you sure you want to delete?");

        if(conf) {
            $http.delete(DispenseURL+"/api/patient/remove/" + data.PatientID, data)
                .success(function (data, status, headers, config) {
                    if (data.success === false) {
                        return $scope.alertSubmit = true;
                    }
                    else {
                        $http.get(DispenseURL+"/api/patients")
                            .then(function (response) {
                                $scope.Patients = response.data;
                            });
                    }
                })
                .error(function (data, status, header, config) {
                    console.log("Error Deleting!");
                });
        }
    }


}]);

mainapp.controller('dispenseDoctor', ['$scope', '$http', function ($scope, $http) {

    $http.get(DispenseURL+"/api/doctors")
        .then(function (response) {
            $scope.Doctors = response.data;
        });

    $http.get(DispenseURL+"/api/doctor/last")
        .then(function (response) {

            var doc = {
                DoctorID: response.data
            };
            $scope.Doctor = doc;
        });

    $scope.addDoctor = function (data) {

        console.log(data);
        $http({
            method:"POST",
            url: DispenseURL+"/api/doctor",
            data: data,
            headers:{
                'Content-Type':'application/json'
            }
        }).success(function (data, status, headers, config) {
            if(data.success === false){
                return $scope.alertSubmit = true;
            }
            else{
                $scope.Doctors.push(data);
                var lastId= data.DoctorID.split("D")[1];
                var newId = "D"+(parseInt(lastId)+1);
                $scope.Doctor = {
                    DoctorID:newId
                };
                alert("Successfully Added to the System!");
                return data.alertSubmit = false;
            }
        })

    }

    $scope.updateDoctor = function (data) {
        var oldData= data;
        console.log(data);
        $http.put(DispenseURL+"/api/docotr/"+data.DoctorID, data)
            .success(function (data, status, headers, config) {
                if(data.success=== false){
                    return $scope.alertSubmit = true;
                }
                else{
                    function findAndReplace(object, value, replaceValue) {
                        for (var x in object) {
                            if (object.hasOwnProperty(x)) {
                                if (typeof object[x] === 'object') {
                                    findAndReplace(object[x], value, replaceValue);
                                }
                                if (object[x] === value) {
                                    object["name"] = replaceValue;
                                    // break; // uncomment to stop after first replacement
                                    console.log("*******");
                                }
                            }
                        }
                    }
                    findAndReplace($scope.Doctors, oldData, data);
                    console.log("Updated!");
                }
            })
            .error(function (data, status, header, config) {
                console.log("Error Updating!")
            });
    }

    $scope.removeDoctor = function (data) {
        var conf=confirm("Are you sure you want to delete?");

        if (conf){
            $http.delete(DispenseURL+"/api/doctor/remove/"+data.DoctorID, data)
                .success(function (data, status, headers, config) {
                    if (data.success === false) {
                        return $scope.alertSubmit = true;
                    }
                    else {
                        $http.get(DispenseURL+"/api/doctors")
                            .then(function (response) {
                                $scope.Doctors = response.data;
                            });
                    }
                })
                .error(function (data, status, header, config) {
                    console.log("Error Deleting!");
                });
        }
    }
}]);

mainapp.controller('dispensePrescription', ['$scope', '$http', function ($scope, $http) {

    $http.get(DispenseURL+"/api/patients")
        .then(function (response) {
            $scope.Patient = response.data;
        });

    $http.get(DispenseURL+"/api/doctors")
        .then(function (response) {
            $scope.Doctor = response.data;
        });

    $http.get(DispenseURL+"/api/prescription/last")
        .then(function (response) {
            var pr={
                PrescriptionID:response.data
            }
            $scope.press = pr;
        });

    $scope.addPrescription = function (data) {


        $http({
            method:"POST",
            url: DispenseURL+"/api/prescription",
            data: data,
            headers:{
                'Content-Type':'application/json'
            }
        }).success(function (data, status, headers, config) {
            if(data.success === false){
                return $scope.alertSubmit = true;
            }
            else{
                var lastId= data.PrescriptionID.split("PR")[1];
                var newId = "PR"+(parseInt(lastId)+1);
                $scope.press = {
                    PrescriptionID:newId
                };
                console.log(data);
                alert("Successfully Added to the System!");
                return $scope.alertSubmit=false;
            }
        });
        $http.get(DispenseURL+"/api/prescriptions")
            .then(function (response) {
                $scope.press = response.data;
            });
    };

    //api from rushan
    $http.get(nodeDarkzURL+"/api/drug")
        .then(function (response) {
            $scope.pressDrugs = response.data;
        });

    $scope.addDrugToPrescription = function(data){
        console.log(data);

        // get - 192.168.1.102:8080/api/pharmacy/stock/drugName
        // return Quantity
        // put - /pharmacy/stock/updatestock
        // body - drugName, drugQuantity
        //
        $scope.availableQuantity=0;
        $http.get(springURL+"/api/pharmacy/stock/"+data.drugName)
            .then(function (response) {
                $scope.availableQuantity = response.data;
                console.log($scope.availableQuantity);

                if(data.Quantity <= $scope.availableQuantity){

                    var updateStock = [{
                        "drugName": data.drugName,
                        "drugQuantity": data.Quantity
                    }];
                    console.log(updateStock);
                    $http({
                        method: "PUT",
                        url: springURL+"/api/pharmacy/stock/update/drug",
                        data: updateStock[0],
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).success(function (data, status, headers, config) {
                        if(data.success=== false){
                            return $scope.alertSubmit = true;
                        }
                        else{
                            return $scope.alertSubmit = true;
                        }
                    }).error(function (data, status, header, config) {
                        console.log("Error Updating!")
                    });

                    $http.get(DispenseURL+"/api/prescription/last")
                        .then(function (response) {
                            var id = response.data.split("PR")[1];
                            $scope.press= "PR"+ (parseInt(id)-1);
                            console.log(2);
                            console.log($scope.press);
                            secondExecution();
                        });


                    function secondExecution(){
                        console.log(3);
                        data={
                            DispenseDrugID : $scope.lastDissID,
                            PrescriptionID : $scope.press,
                            DrugName : data.drugName,
                            Quantity : data.Quantity,
                            Dosage : data.Dosage,
                            Schedule : data.Schedule
                        };
                        console.log(data);
                        $http({
                            method:"POST",
                            url: DispenseURL+"/api/dispensedrug",
                            data: data,
                            headers:{
                                'Content-Type':'application/json'
                            }
                        }).success(function (data, status, headers, config) {
                            if(data.success === false){
                                return $scope.alertSubmit = true;
                            }
                            else{
                                if(typeof $scope.Pres === 'undefined'){
                                    $scope.Pres = [{
                                        DispenseDrugID : data.DispenseDrugID,
                                        PrescriptionID : data.PrescriptionID,
                                        DrugName : data.drugName,
                                        Quantity : data.Quantity,
                                        Dosage : data.Dosage,
                                        Schedule : data.Schedule
                                    }];
                                    console.log($scope.Pres.DispenseDrugID);
                                }else {
                                    $scope.Pres.push(data);
                                    console.log(data);
                                    return data.alertSubmit = false;
                                }
                            }
                        }).error(function(data, status, headers, config) {

                            console.log("Error insert!");
                            return $scope.alertSubmit = false;
                        });
                    }
                }
                else{
                    alert("Oops! Stock not enough to issue this drug!");
                }
            });


    };

    $scope.successMsg = function(){
        alert("Successfully Added to the System!");
    };

    $scope.removePressDrug = function (data) {
        var conf = confirm("Are you sure want to delete?");
        if (conf) {
            var oldPresId = data.PrescriptionID;
            $http.delete(DispenseURL+"/api/dispensedrug/remove/" + data.DispenseDrugID, data)
                .success(function (data, status, headers, config) {
                    if (data.success === false) {
                        return $scope.alertSubmit = true;
                    }
                    else {
                        $http.get(DispenseURL+"/api/dispensedrug/id/" + oldPresId)
                            .then(function (response) {
                                $scope.Pres = response.data;
                                console.log($scope.Pres);
                            });
                    }
                })
                .error(function (data, status, header, config) {
                    console.log("Error Deleting!");
                });
        }
    }
}]);


mainapp.controller('dispenseDrugs', ['$scope', '$http', function ($scope, $http) {

    $http.get(DispenseURL+"/api/prescriptions/status/Pending")
        .then(function (response) {
            $scope.Pres = response.data;
        });

    $scope.viewPrescription = function (data) {
        $http.get(DispenseURL+"/api/dispensedrug/id/"+data.PrescriptionID)
            .then(function (response) {
                $scope.Drugs = response.data;
                console.log($scope.Drugs);
            });
    };

    $scope.IsVisible = false;
    $scope.Show = function () {
        //If DIV is visible it will be hidden and vice versa.
        // $scope.IsVisible = $scope.IsVisible ? false : true;
        if(!$scope.IsVisible){
            $scope.IsVisible = true;
        }
    };
    $scope.Hide = function () {
        if($scope.IsVisible){
            $scope.IsVisible = false;
        }
    };

    $scope.removePressPlacedDrug = function (data) {

        var conf = confirm("Are you sure want to delete?");

        if (conf) {

            var oldPresId = data.PrescriptionID;
            $http.delete(DispenseURL+"/api/dispensedrug/remove/" + data.DispenseDrugID, data)
                .success(function (data, status, headers, config) {
                    if (data.success === false) {
                        return $scope.alertSubmit = true;
                    }
                    else {
                        $http.get(DispenseURL+"/api/dispensedrug/id/" + oldPresId)
                            .then(function (response) {
                                $scope.Drugs = response.data;
                                console.log($scope.Drugs);
                                console.log(oldPresId);
                                var len = $scope.Drugs.length;
                                if(len == 0){
                                    $http.delete(DispenseURL+"/api/prescription/remove/" +oldPresId, data)
                                        .success(function (data, status, headers, config) {
                                            if (data.success === false) {
                                                return $scope.alertSubmit = true;
                                            }
                                            else{
                                                $http.get(DispenseURL+"/api/prescriptions/status/Pending")
                                                    .then(function (response) {
                                                        $scope.Pres = response.data;
                                                        console.log($scope.Pres);
                                                    });
                                            }
                                        })
                                        .error(function (data, status, header, config) {
                                            console.log("Error Deleting!");
                                        });
                                }
                            });
                    }
                })
                .error(function (data, status, header, config) {
                    console.log("Error Deleting!");
                });
        }
    };


    $scope.removePrescription = function (data) {
        var conf = confirm("Are you sure want to delete?");
        if (conf) {
            var oldPresId = data.PrescriptionID;
            $http.delete(DispenseURL+"/api/dispensedrug/remove/prescription/" + data.PrescriptionID, data)
                .success(function (data, status, headers, config) {
                    if (data.success === false) {
                        return $scope.alertSubmit = true;
                    }
                    else {
                        $http.delete(DispenseURL+"/api/prescription/remove/" +oldPresId, data)
                            .success(function (data, status, headers, config) {
                                if (data.success === false) {
                                    return $scope.alertSubmit = true;
                                }
                                else{
                                    $http.get(DispenseURL+"/api/prescriptions/status/Pending")
                                        .then(function (response) {
                                            $scope.Pres = response.data;
                                            console.log($scope.Pres);
                                        });
                                }
                            })
                            .error(function (data, status, header, config) {
                                console.log("Error Deleting!");
                            });
                    }
                })
                .error(function (data, status, header, config) {
                    console.log("Error Deleting!");
                });
        }
    };

    $scope.dispenseAndUpdateStatus = function(){
        console.log($scope.prescription);
        var data=[{
            PatientName : $scope.prescription[0].PatientName,
            DoctorName : $scope.prescription[0].DoctorName,
            PrescriptionDate : $scope.prescription[0].PrescriptionDate,
            Age: $scope.prescription[0].Age,
            Reason: $scope.prescription[0].Reason,
            PrescriptionStatus : "Issued"
        }];
        console.log(data[0]);
        $http({
            method: "PUT",
            url: DispenseURL+"/api/prescriptions/" + $scope.prescription[0].PrescriptionID,
            data: data[0],
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data, status, headers, config) {
            if(data.success=== false){
                return $scope.alertSubmit = true;
            }
            else{
                $http.get(DispenseURL+"/api/prescriptions/status/Pending")
                    .then(function (response) {
                        $scope.Pres = response.data;
                    });
            }
        })
            .error(function (data, status, header, config) {
                console.log("Error Updating!")
            });
    };

    $scope.passData = function (data){
        console.log(data);
        $scope.prescription = [{
            PrescriptionID: data.PrescriptionID,
            PatientName : data.PatientName,
            DoctorName : data.DoctorName,
            CreatedDate : data.CreatedDate,
            PrescriptionDate : data.PrescriptionDate,
            Age: data.Age,
            Reason: data.Reason,
            PrescriptionStatus : data.PrescriptionStatus
        }];
    };


}]);


//---------------History drugs--------

mainapp.controller('historyDispenseDrugs', ['$scope', '$http', function ($scope, $http) {

    $http.get(DispenseURL+"/api/prescriptions/status/Issued")
        .then(function (response) {
            $scope.Pres = response.data;
        });

    $scope.viewOldPrescription = function (data) {
        $http.get(DispenseURL+"/api/dispensedrug/id/"+data.PrescriptionID)
            .then(function (response) {
                $scope.Drugs = response.data;
                console.log($scope.Drugs);
            });
    };

    $scope.IsVisible = false;
    $scope.Show = function () {
        //If DIV is visible it will be hidden and vice versa.
        // $scope.IsVisible = $scope.IsVisible ? false : true;
        if(!$scope.IsVisible){
            $scope.IsVisible = true;
        }
    };
    $scope.Hide = function () {
        if($scope.IsVisible){
            $scope.IsVisible = false;
        }
    };

    $scope.removeOldPrescription = function (data) {
        var conf = confirm("Are you sure want to delete?");
        if (conf) {
            var oldPresId = data.PrescriptionID;
            $http.delete(DispenseURL+"/api/dispensedrug/remove/prescription/" + data.PrescriptionID, data)
                .success(function (data, status, headers, config) {
                    if (data.success === false) {
                        return $scope.alertSubmit = true;
                    }
                    else {
                        $http.delete(DispenseURL+"/api/prescription/remove/" +oldPresId, data)
                            .success(function (data, status, headers, config) {
                                if (data.success === false) {
                                    return $scope.alertSubmit = true;
                                }
                                else{
                                    $http.get(DispenseURL+"/api/prescriptions/status/Issued")
                                        .then(function (response) {
                                            $scope.Pres = response.data;
                                            console.log($scope.Pres);
                                        });
                                }
                            })
                            .error(function (data, status, header, config) {
                                console.log("Error Deleting!");
                            });
                    }
                })
                .error(function (data, status, header, config) {
                    console.log("Error Deleting!");
                });
        }
    };

    $scope.passData = function (data){
        console.log(data);
        $scope.prescription = [{
            PrescriptionID: data.PrescriptionID,
            PatientName : data.PatientName,
            DoctorName : data.DoctorName,
            CreatedDate : data.CreatedDate,
            PrescriptionDate : data.PrescriptionDate,
            Age: data.Age,
            Reason: data.Reason,
            PrescriptionStatus : data.PrescriptionStatus
        }];
    };

}]);


