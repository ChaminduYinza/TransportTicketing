function HTMLtoExpPDF(){

	 var pdf = new jsPDF('p', 'pt', 'letter');
 pdf.addHTML($('#HTMLtoPDF')[0], function () {

      var date = new Date().toJSON().slice(0,10);
      
        pdf.save('Expired Pharmacy Stock '+date+'.pdf');
 });


}



function HTMLtoPDF(){





// var emailID = document.getElementById("sendMail");
// var dangerID = document.getElementById("danger");
// var reOrderID = document.getElementById("reorder");
// var defaultID = document.getElementById("default");


// defaultID.style.display = 'none';
// // dangerID.style.display = 'none';
// // reOrderID.style.display = 'none';
// // emailID.style.display = 'none';


 //   var pdf = new jsPDF('p', 'pt', 'letter');
 // pdf.addHTML($('#HTMLtoPDF')[0], function () {

 //      var date = new Date().toJSON().slice(0,10);
      
 //        pdf.save('Pharmacy Stock '+date+'.pdf');
 // });


   var pdf = new jsPDF('p', 'pt', 'letter');
 pdf.addHTML($('#HTMLtoPDF')[0], function () {

      var date = new Date().toJSON().slice(0,10);
      
        pdf.save('Pharmacy Stock '+date+'.pdf');
 });



//  var pdf = new jsPDF('p', 'pt', 'letter');
// source = $('#HTMLtoPDF')[0];
// specialElementHandlers = {
// 	'#bypassme': function(element, renderer){
// 		return true
// 	}
// }
// margins = {
//     top: 50,
//     left: 60,
//     width: 545
//   };
// pdf.addHTML(
//   	source // HTML string or DOM elem ref.
//   	, margins.left // x coord
//   	, margins.top // y coord
//   	, {
//   		'width': margins.width // max width of content on PDF
//   		, 'elementHandlers': specialElementHandlers
//   	},
//   	function (dispose) {
//   	  // dispose: object with X, Y of the last line add to the PDF
//   	  //          this allow the insertion of new lines after html

//       var date = new Date().toJSON().slice(0,10);
      
//         pdf.save('Pharmacy Stock '+date+'.pdf');
//       }
//   )		








}