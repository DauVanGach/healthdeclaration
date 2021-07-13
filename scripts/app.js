		var qrcode = new QRCode(document.getElementById("qrcode"),{
		width : 500,
		height : 500,
		useSVG: true
		});
		var x = 1,	// So lan khai bao thoi gian dia diem
		y = 1;
		
		//async function doDatabaseStuff() {
		//const db = await idb.openDB(…);
		//}

  function makeCode () {		
		var alterText = "Tờ khai y tế \n";
		var filedContactInf = ''; // Giá trị lưu biến nơi tiếp xúc
		var userText =  document.getElementById("user");
		var birthdayText =  document.getElementById("birthday");
		var unit_Text =  document.getElementById("unit_");
		var phoneNumberText =  document.getElementById("phoneNumber");
		var vacTypeText =  document.querySelector('#vactypeInput').value;
		if(!vacTypeText) vacTypeText = "";
		
		alterText = alterText + userText.value + '\n' + birthdayText.value.toString() + '\n' + $("input[type='radio'][name='sex']:checked").val() + '\n' + unit_Text.value + '\n' + phoneNumberText.value.toString() + '\n' + $("input[type='radio'][name='vacInject']:checked").val() + '\n' + vacTypeText + '\n' + $("input[type='radio'][name='symptoms']:checked").val() + '\n';
		
		if(x >= 1){
			for(let  i = 1; i <= x;i++){
				filedContactInf = 	filedContactInf + document.getElementById("timeContact"+ i +"1").value.toString() + "\n" +
									document.getElementById("dateContact"+ i +"1").value.toString() + "\n" +
									document.getElementById("timeContact"+ i +"2").value.toString() + "\n" +
									document.getElementById("dateContact"+ i +"2").value.toString() + "\n" +
									document.getElementById("noiDenTinhId"+ i).value.toString() + "\n" +
									document.getElementById("noiDenHuyenId"+ i).value.toString() + "\n" +
									document.getElementById("noiDenXaId"+ i).value.toString() + "\n" +
									document.getElementById("persionContact"+ i).value.toString() + "\n";
			}
		}
		
		alterText = alterText + filedContactInf;
		if (!alterText) {
			alert("Input a text");
			return;
		}

      qrcode.makeCode(alterText);
  }
	
 // makeCode();
  function declareFunction(){
	var qrcodeView = document.getElementById("qrcodeView");
	var formView = document.getElementById("declareForm");
	var qrdescript = document.getElementById("qrdescript");
	var titleDeclare = document.getElementById("title-declare");
	makeCode();
	formView.style.display = "none"
	qrcodeView.style.display = "block";
	titleDeclare.style.display = "none";
	qrdescript.style.display  = "block";
	
  }
  
  function  resetFunction(){
	var qrcodeView = document.getElementById("qrcodeView");
	var formView = document.getElementById("declareForm");
	var titleDeclare = document.getElementById("title-declare");
	var qrdescript = document.getElementById("qrdescript");
	document.getElementById("declareForm").reset();
	qrcodeView.style.display = "none";
	formView.style.display = "block"
	titleDeclare.style.display = "block";
	qrdescript.style.display  = "none";
  }
  
  function reDeclareFunction(){
	var qrcodeView = document.getElementById("qrcodeView");
	var formView = document.getElementById("declareForm");
	var titleDeclare = document.getElementById("title-declare");
	var qrdescript = document.getElementById("qrdescript");
	//document.getElementById("declareForm").reset();
	qrcodeView.style.display = "none";
	formView.style.display = "block"
	titleDeclare.style.display = "block";
	qrdescript.style.display  = "none";
  }
		// add filed
		$("#addField").click(function () {
		if(x >= 1) x++;
		var html = '';
			html += '<div id="fieldDeclarre' + x + '">';
			html += '<input id="timeContact' + x + '1" type="number" class="input" placeholder="Từ giờ" min="0" max="23">';
			html += '<input id="dateContact' + x + '1" type="date" class="input" placeholder="Ngày">';
			html += '<input id="timeContact' + x + '2" type="number" class="input" placeholder="Đến giờ" min="0" max="23">';
			html += '<input id="dateContact' + x + '2" type="date" class="input" placeholder="Ngày">';
			//html += '<input id="persionContact' + x + '" type="text" class="input" placeholder="Tiếng Việt có dấu">';
			
			html += '<label for="noiDenTinhId' + x + '" class="label">Bạn đã đến:</label><select id="noiDenTinhId' + x + '" name="noiDenTinhId' + x + '" class="input" required="true" onchange="changeTinhThanh(&#39;noiDenTinhId' + x + '&#39;,&#39;noiDenHuyenId' + x + '&#39;,&#39;noiDenXaId' + x + '&#39;);"><option value="">-- Chọn Tỉnh/Thành --</option><option value="01">thành phố Hà Nội</option><option value="31">thành phố Hải Phòng</option>						<option value="48">thành phố Đà Nẵng</option>	<option value="79">thành phố Hồ Chí Minh</option><option value="92">thành phố Cần Thơ</option><option value="02">tỉnh Hà Giang</option>	<option value="04">tỉnh Cao Bằng</option><option value="06">tỉnh Bắc Kạn</option>		<option value="08">tỉnh Tuyên Quang</option><option value="10">tỉnh Lào Cai</option>	<option value="11">tỉnh Điện Biên</option><option value="12">tỉnh Lai Châu</option>	<option value="14">tỉnh Sơn La</option>	<option value="15">tỉnh Yên Bái</option><option value="17">tỉnh Hoà Bình</option><option value="19">tỉnh Thái Nguyên</option>						<option value="20">tỉnh Lạng Sơn</option>						<option value="22">tỉnh Quảng Ninh</option>						<option value="24">tỉnh Bắc Giang</option>						<option value="25">tỉnh Phú Thọ</option>						<option value="26">tỉnh Vĩnh Phúc</option>						<option value="27">tỉnh Bắc Ninh</option>						<option value="30">tỉnh Hải Dương</option>						<option value="33">tỉnh Hưng Yên</option>						<option value="34">tỉnh Thái Bình</option>						<option value="35">tỉnh Hà Nam</option>						<option value="36">tỉnh Nam Định</option>						<option value="37">tỉnh Ninh Bình</option>					<option value="38">tỉnh Thanh Hóa</option>						<option value="40">tỉnh Nghệ An</option>						<option value="42">tỉnh Hà Tĩnh</option>						<option value="44">tỉnh Quảng Bình</option>						<option value="45">tỉnh Quảng Trị</option>						<option value="46">tỉnh Thừa Thiên Huế</option>						<option value="49">tỉnh Quảng Nam</option>						<option value="51">tỉnh Quảng Ngãi</option>						<option value="52">tỉnh Bình Định</option>						<option value="54">tỉnh Phú Yên</option>						<option value="56">tỉnh Khánh Hòa</option><option value="58">tỉnh Ninh Thuận</option><option value="60">tỉnh Bình Thuận</option>						<option value="62">tỉnh Kon Tum</option>						<option value="64">tỉnh Gia Lai</option>						<option value="66">tỉnh Đắk Lắk</option>						<option value="67">tỉnh Đắk Nông</option>						<option value="68">tỉnh Lâm Đồng</option>						<option value="70">tỉnh Bình Phước</option>						<option value="72">tỉnh Tây Ninh</option>						<option value="74">tỉnh Bình Dương</option><option value="75">tỉnh Đồng Nai</option>	<option value="77">tỉnh Bà Rịa - Vũng Tàu</option>						<option value="80">tỉnh Long An</option>					<option value="82">tỉnh Tiền Giang</option>						<option value="83">tỉnh Bến Tre</option>	<option value="84">tỉnh Trà Vinh</option>						<option value="86">tỉnh Vĩnh Long</option>					<option value="87">tỉnh Đồng Tháp</option>						<option value="89">tỉnh An Giang</option>						<option value="91">tỉnh Kiên Giang</option>						<option value="93">tỉnh Hậu Giang</option>						<option value="94">tỉnh Sóc Trăng</option>						<option value="95">tỉnh Bạc Liêu</option><option value="96">tỉnh Cà Mau</option></select><select id="noiDenHuyenId' + x ;
			html += '" name="noiDenHuyenId' + x + '" class="input" onchange="changeQuanHuyen(&#39;noiDenHuyenId' + x + '&#39;,&#39;noiDenXaId' + x + '&#39;);"><option value="">-- Chọn Quận/Huyện --</option></select>  <select id="noiDenXaId' + x + '" name="noiDenXaId' + x + '" class="input"><option value="">-- Chọn Phường/Xã --</option></select><input id="persionContact' + x + '" type="text" class="input" placeholder="Số, đường/Tổ/Thôn/Xóm">';
					
			
			//html += '<button id="removeField" type="button" class="button"> Xóa khai báo này</button>';
			html += '</div>';
			//html += ;
			
		$('#newField').append(html);
		});

        // remove field
        $(document).on('click', '#removeField', function () {
			if(x > 1){	//Check number of field
				$('#fieldDeclarre' + x).remove();
				x--;
				//$(this).closest('#fieldDeclarre' + x).remove(); // Xoa cai gna nhat, ap dung trong truong hop moi cai deu co xoa duoc
			}
        });
		//----------------------Tinh/thanh-----------------------------------
	var idTinh = '', idHuyen = '', idXa = '';
	function changeTinhThanh(curIdTinh,curIdHuyen,curIdXa){
		idTinh = curIdTinh;
		idHuyen = curIdHuyen;
		idXa = curIdXa;
		document.getElementById(idHuyen).innerHTML = '<option value="">-- Chọn Quận/Huyện --</option>';
		document.getElementById(idXa).innerHTML = '<option value="">-- Chọn Phường/Xã --</option>';
		$.ajax({
		url:'dvhc_data.xml',
		type:'get',
		dataType:'xml',
		timeout:1000,
		success:parse_xml
		});
	}
	
	function parse_xml(xml,status){
		if(status!='success')return;
		$(xml).find('DVHC').each(ajaxXml);
	}
	function ajaxXml(){
		var CapTren = $(this).find('CapTren').text();
		var optionText;
		var optionValue;
		var sel = document.getElementById(idHuyen);
		var opt = document.createElement('option'); // create new option element
		if(CapTren == document.getElementById(idTinh).value){
			optionText = $(this).find('Ten').text();
			optionValue = $(this).find('MaDVHC').text();
			opt.appendChild( document.createTextNode(optionText) );// create text node to add to option element (opt)
			opt.value = optionValue; // set value property of opt
			sel.appendChild(opt); // add opt to end of select box (sel)
		}
	}
	//-----------------------Quan/huyen------------------------------------
	function changeQuanHuyen(curIdHuyen,curIdXa){
		idHuyen = curIdHuyen;
		idXa = curIdXa;
		document.getElementById(idXa).innerHTML = '<option value="">-- Chọn Phường/Xã --</option>';
		$.ajax({
		url:'dvhc_data.xml',
		type:'get',
		dataType:'xml',
		timeout:1000,
		success:parse_Xa
		});
	}	
	function parse_Xa(xml, status){
		if(status != 'success') return;
		$(xml).find('DVHC').each(updateXa);
	}
	function updateXa(){
		var CapTren = $(this).find('CapTren').text();
		var optionText;
		var optionValue;
		var sel = document.getElementById(idXa);
		var opt = document.createElement('option'); // create new option element
		if(CapTren == document.getElementById(idHuyen).value){
			optionText = $(this).find('Ten').text();
			optionValue = $(this).find('MaDVHC').text();
			opt.appendChild( document.createTextNode(optionText) );// create text node to add to option element (opt)
			opt.value = optionValue; // set value property of opt
			sel.appendChild(opt); // add opt to end of select box (sel)
		}
	}