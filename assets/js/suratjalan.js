$.fn.DataTable.ext.pager.numbers_length = 5;

$(document).ready(function(){
	$('.select2').select2({width:'100%',placeholder: '-- select one --'});

	var currDate = new Date();
	$('.date').datepicker({
		locale: {
    	dateFormat: 'YYYY-MM-DD'
  	    },
  	    startDate : currDate,
	});

	$('.call-add-suratjalan').click(function(){
		$('#panel_1').slideDown();
		$('.call-add-suratjalan').hide('slow');
	});

	$('.call-minimize-suratjalan').click(function(){
		$('#panel_1').slideUp('slow');
		$('.call-add-suratjalan').show('slow');
	});

	$('#sasis').prop('disabled', false);
	$('#tugas').prop('disabled', true);
	document.getElementById("formtugas").style.display = 'none';

	list(); 

	$('.call-refresh').click(function(){
		list();
	});

	$('#plant').change(function(){
		list();
	});

	$('input[type="radio"][id=ukuran]').on('change', function(e) {
	    console.log($(this).val());
	    if ($(this).val() == 0)
	    {
	    	$('#sasis').html('');
	    	$('#container').html('');
	    	$('#isimuatan').prop('disabled', true);
	    	$('#container').prop('disabled', true);
			$('#gembok').prop('disabled', true);
	    	$('#segelpelayaran').prop('disabled', true);
	    	$('#segelbeacukai').prop('disabled', true);
	    	$('#sasis').prop('disabled', true);

	    	document.getElementById("formsasis").style.display = 'none';
	    	document.getElementById("formmuatan").style.display = 'none';
	    	document.getElementById("formcontainer").style.display = 'none';
	    	document.getElementById("formgembok").style.display = 'none';
	    	document.getElementById("formpelayaran").style.display = 'none';
	    	document.getElementById("formbeacukai").style.display = 'none';
			document.getElementById("formtugas").style.display = 'block';

	    	$('#isimuatan').val("");
	    	$('#tugas').prop('disabled', false);
	    	$('#isopir').prop('disabled', true);
	    	$('#isopir').val("");
	    	getKendaraan(0);
	    	getSopir(0);
	    } else
	    {
	    	getSasis();
	    	getContainer();
	    	$('#isimuatan').prop('disabled', false);
			$('#gembok').prop('disabled', false);
	    	$('#segelpelayaran').prop('disabled', false);
	    	$('#segelbeacukai').prop('disabled', false);

	    	document.getElementById("formtugas").style.display = 'none';
	    	document.getElementById("formsasis").style.display = 'block';
	    	document.getElementById("formmuatan").style.display = 'block';
	    	document.getElementById("formcontainer").style.display = 'block';
	    	document.getElementById("formgembok").style.display = 'block';
	    	document.getElementById("formpelayaran").style.display = 'block';
	    	document.getElementById("formbeacukai").style.display = 'block';
			
	    	$('#isimuatan').val("");
	    	$('#isopir').prop('disabled', true);
	    	$('#isopir').val("");
	    	$('#tugas').val("");
	    	$('#sasis').prop('disabled', false);
	    	$('#container').prop('disabled', false);
	    	$('#tugas').prop('disabled', true);
	    	getKendaraan(1);
	    	getSopir(1);
	    }
	});

	$('#tujuan').change(function(){
		if($(this).val() == 9999){
			$('#itujuan').prop('disabled', false);
		}else{
			$('#itujuan').prop('disabled', true);
		}
	});

	$('#sasis').change(function(){
		var $id = $(this).val();

		$.ajax({
			url : base_url+'SuratJalan/getCont',
			type: 'post',
			dataType: 'json',
			data: {id:$id},
			success:function(data){
				$('#container').val(data['nocont']).change();
			}
		});
	});

	$('#container').change(function(){
		//alert('2');
	});

	$('#sopir').change(function(){
		if($(this).val() == 9999 || $(this).val() == 9998){
			$('#isopir').prop('disabled', false);
		}else{
			$('#isopir').prop('disabled', true);
		}
	});

	$('#sopir').change(function(){
		if($(this).val() == 9999 || $(this).val() == 9998){
			$('#isopir').prop('disabled', false);
		}else{
			$('#isopir').prop('disabled', true);
		}
	});

	getKendaraan(1);
	getSasis();
	getSopir(1);
	getTujuan();
	getContainer();

	$('#list_table').on('click','.call-data-update', function(){
			var $id = $(this).data('id');
			$.ajax({
				url : base_url+'SuratJalan/formUpdate',
				type: 'post',
				dataType: 'json',
				data: {id:$id},
				success:function(data){
					$('#target-update').html(data['html']);
					$('.select2').select2({width:'100%',placeholder: '-- select one --'});
				}
			});
	});

	$('#list_table').on('click','.call-data-preview',function(){
		var $id = $(this).data('id');
		$.ajax({
			url : base_url+'SuratJalan/formPreview',
			type: 'post',
			dataType: 'json',
			data: {id:$id},
			success:function(data){
				
			 	$('#target-preview').html(data['html']);
			 	$('.select2').select2({width:'100%',placeholder: '-- select one --'});
			}
		});
	});

	$('#list_table_his').on('click','.call-data-preview',function(){
		var $id = $(this).data('id');
		$.ajax({
			url : base_url+'Planning/formPreview',
			type: 'post',
			dataType: 'json',
			data: {id:$id},
			success:function(data){
				
			 	$('#target-preview').html(data['html']);
			 	$('.select2').select2({width:'100%',placeholder: '-- select one --'});
			}
		});
	});

	$('#form_add_1').submit(function(e){
		$('#buttn').prop('disabled', true);
		e.preventDefault();
		$.ajax({
			url: base_url+"SuratJalan/insertData",
			type: 'post',
			dataType: 'json',
			data : new FormData(this),
			cache : false,
			contentType : false,
			processData : false,
			success:function(data){
				if(data['status'] == 1){
					list();
					toastr.success("Insert berhasil");
				}else{
					toastr.error('Ups..! Insert gagal !');
				}
				$('#buttn').prop('disabled', false);
			}
		});
	});

	$('#target-update').on('submit','#form-update', function(e){
		e.preventDefault();

		$.ajax({
			url: base_url+"Planning/prosesUpdate",
			type: 'post',
			dataType: 'json',
			data : new FormData(this),
			cache : false,
			contentType : false,
			processData : false,
			success:function(data){
				if(data['status'] == 1){
					list();
				 	$('#modal-update').modal('hide');
				 	toastr.success('Update berhasil');
				}else{
				 	toastr.error('Ups..! Update gagal !');
				}
			}
		});
	});

});

function list(){
	$('#list_table').loading();
	var $id = $('#plant').val();
	$.ajax({
		url : base_url+'SuratJalan/myList',
		type: 'post',
		dataType: 'json',
		data: {id:$id},
		success:function(data){ 
			$('#list_table').hide().html(data['html']);
			$('#list_table').loading('stop');
			$('[data-toggle=delete-pop]').confirmation({
		    rootSelector: '[data-toggle=delete-pop]',
		    container: 'body',
		    onConfirm: function() {
		    	var id = $(this).data('id');
			    remove_data(id);
			  }
		  }); 
 
	      $('#table_1').DataTable({
	      	    "bInfo" : false,
				"language" : {
	        		searchPlaceholder: ""
	    		},
				"oLanguage": {
			       sLengthMenu: "_MENU_",
			    },
	      	    "order": [[ 1, "desc" ]],
                "initComplete": function (settings, json) {  
				    $("#table_1").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");            
				}, 
				"columnDefs": [
		            {
		                "targets": [ 1 ],
		                "visible": false
		            }
		        ],
				"rowCallback": function (nRow, aData, iDisplayIndex) {
					 var oSettings = this.fnSettings ();
					 $("td:first", nRow).html(oSettings._iDisplayStart+iDisplayIndex +1);
					 return nRow;
				},
		  });
		  
		  $('#list_table').show();

		}
	});
}

function remove_data(id){
	$.ajax({
		url : base_url+"SuratJalan/deleteData",
		type: 'post',
		dataType: 'json',
		data: {id:id},
		success:function(data){
			if (data['status'] == '1') {
				list();
				toastr.success('Delete berhasil');
			}else{
				toastr.error('Ups..! Delete gagal !');
			}
		}
	});
}

function getSasis(){
	var $plant = $('#mplant').val();
	$.ajax({
		url : base_url+'SuratJalan/getSasis',
		type: 'post',
		dataType: 'json',
		data: {plant:$plant},
		success:function(data){
			$('#sasis').html(data);
		}
	});
}

function getTujuan(){
	$.ajax({
		url : base_url+'SuratJalan/getTujuan',
		type: 'post',
		dataType: 'json',
		data: {plant:0},
		success:function(data){
			$('#tujuan').html(data);
		}
	});
}

function getContainer(){
	$.ajax({
		url : base_url+'SuratJalan/getContainer',
		type: 'post',
		dataType: 'json',
		data: {plant:0},
		success:function(data){
			$('#container').html(data);
		}
	});
}

function getSopir(jns){
	//var $jns = $('input[type="radio"]').val();
	$.ajax({ 
		url : base_url+'SuratJalan/getSopir',
		type: 'post',
		dataType: 'json',
		data: {jns:jns},
		success:function(data){
			$('#sopir').html(data);
		}
	});
}

function getKendaraan(ukuran){
	//var $plant = $('#mplant').val();
	$.ajax({
		url : base_url+'SuratJalan/getKendaraan',
		type: 'post',
		dataType: 'json',
		data: {ukuran:ukuran},
		success:function(data){
			$('#kendaraan').html(data);
		}
	});
}


 