	
	var qrcode = new QRCode(document.getElementById("qrcode"),{
	width : 500,
	height : 500,
	useSVG: true
	});
	var x = 1,	// So lan khai bao thoi gian dia diem
	y = 1;
	var url = "data/dvhc.js",
	dbDefined = false,
	userCodeSaved ='',
	dataStored,
	date,
	userForm,
	strHTML,
	userStored,
	formData,
	update = false;
						
  	var dbPromise = idb.open('database', 4, function(upgradeDb) {
    switch (upgradeDb.oldVersion) {
      case 0:
        // a placeholder case so that the switch block will
        // execute when the database is first created
        // (oldVersion is 0)
		upgradeDb.createObjectStore('dvhcStore', {keyPath: 'MaDVHC'});
      case 1:
       //console.log('Creating the products object store');
	   upgradeDb.createObjectStore('userStore', {keyPath: 'dataIndex'});
      case 2:
        console.log('Creating a name index');
        var store = upgradeDb.transaction.objectStore('dvhcStore');
        store.createIndex('Ten', 'Ten', {unique:false});
		store.createIndex('Cap', 'Cap', {unique: false});
		store.createIndex('CapTren', 'CapTren', {unique: false});
      case 3:
        console.log('Creating description and price indexes');
        //var store = upgradeDb.transaction.objectStore('dvhcStore');
        //store.createIndex('price', 'price');
        //store.createIndex('description', 'description');

      // TODO 5.1 - create an 'orders' object store

    }
	});

	dbPromise.then(function(db){
		var tx = db.transaction('dvhcStore', 'readonly');
		var store = tx.objectStore('dvhcStore');
		return (store.get("01"));
	}).then(function (dataChecked){
		return ((dataChecked) == undefined);
	}).then( function(checked){
		if(checked)
		fetch(url)
		.then(response => response.json())
		.then(data => dataStored = data)
		.then(() => storeData())
		else ;//retrieveForm()

	})

	dbPromise.then(function(db){
		var tx = db.transaction('userStore', 'readonly');
		var store = tx.objectStore('userStore');
		return (store.get("01"));
	}).then(function (dataChecked){
		if(dataChecked != undefined) retrieveForm()
		else document.getElementById('btnRetrieve').style.display = "none";
	})


  
  
  function storeData(){
	dbPromise.then(function(db) {
      var tx = db.transaction('dvhcStore', 'readwrite');
      var store = tx.objectStore('dvhcStore');
	  var items = dataStored;
	  return Promise.all(items.map(function(item) {
			console.log('Adding item: ', item);
			//if(store.get('MaDVHC') == null)
			return store.add(item);
		})).catch(function(e) {
		  		tx.abort();
		  		console.log(e);
		}).then(function() {
		  		console.log('All items added successfully!');
		});
	
	})
	}

	function storeUser(){
		dbPromise.then(function(db) {
			var tx = db.transaction('userStore', 'readwrite');
			var store = tx.objectStore('userStore');
			var items = userStored;
			console.log(items)
			return Promise.all(items.map(function(item) {
				console.log('Adding item: ', item);
				return store.put(item);
			})).catch(function(e) {
					  tx.abort();
					  console.log(e);
			}).then(function() {
					  console.log('All items added successfully!');
			});
		})

	}

  function makeCode() {		
		userCodeSaved = "Tờ khai y tế %";
		var filedContactInf = ''; // Giá trị lưu biến nơi tiếp xúc
		var userText =  document.getElementById("user");
		var birthdayText =  document.getElementById("birthday");
		var unit_Text =  document.getElementById("unit_");
		var phoneNumberText =  document.getElementById("phoneNumber");
		var vacTypeText =  document.querySelector('#vactypeInput').value;
		if(!vacTypeText) vacTypeText = "";
		
		userCodeSaved = userCodeSaved + userText.value + '%' + birthdayText.value.toString() + '%' + $("input[type='radio'][name='sex']:checked").val() + '%' + unit_Text.value + '%' + phoneNumberText.value.toString() + '%' + $("input[type='radio'][name='vacInject']:checked").val() + '%' + vacTypeText + '%' + $("input[type='radio'][name='symptoms']:checked").val() + '%';
		if(x >= 1){
			for(let  i = 1; i <= x; i++){
				filedContactInf = 	filedContactInf + document.getElementById("timeContact1"+ i).value.toString() + "%" +
									document.getElementById("dateContact1"+ i).value.toString() + "%" +
									document.getElementById("timeContact2"+ i).value.toString() + "%" +
									document.getElementById("dateContact2"+ i).value.toString() + "%" +
									document.getElementById("noiDenTinhId"+ i).value.toString() + "%" +
									document.getElementById("noiDenHuyenId"+ i).value.toString() + "%" +
									document.getElementById("noiDenXaId"+ i).value.toString() + "%" +
									document.getElementById("persionContact"+ i).value.toString() + "%";
			}
		}
		
		userCodeSaved = userCodeSaved + filedContactInf;
		if (!userCodeSaved) {
			alert("Input a text");
			return;
		}
      qrcode.makeCode(userCodeSaved);
	  formData = userCodeSaved.split('%');
	  console.log('formData: ', formData)
  }

  function declareFunction(){
	var qrcodeView = document.getElementById("qrcodeView");
	var formView = document.getElementById("declareForm");
	var qrdescript = document.getElementById("qrdescript");
	var titleDeclare = document.getElementById("title-declare");
	makeCode();
	saveCode();
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

  function addFieldFunction(){
	  x++;
	  var html = '';
	  html += '<div id="fieldDeclarre' + x + '"> <fieldset> <legend>Địa điểm ' + x + ': </legend>' +  '<input id="timeContact1' + x + '" type="number" class="input" placeholder="Từ giờ" min="0" max="23"><input id="dateContact1' + x + '" type="date" class="input" placeholder="Ngày"><input id="timeContact2' + x + '" type="number" class="input" placeholder="Đến giờ" min="0" max="23"><input id="dateContact2' + x + '" type="date" class="input" placeholder="Ngày"><label for="noiDenTinhId' + x + '" class="label">Bạn đã đến:</label><select id="noiDenTinhId' + x + '" name="noiDenTinhId' + x + '" class="input" required="true" onchange="changeTinhThanh(&#39;noiDenTinhId' + x + '&#39;,&#39;noiDenHuyenId' + x + '&#39;,&#39;noiDenXaId' + x + '&#39;);"><option value="">-- Chọn Tỉnh/Thành --</option><option value="01">thành phố Hà Nội</option><option value="31">thành phố Hải Phòng</option>						<option value="48">thành phố Đà Nẵng</option>	<option value="79">thành phố Hồ Chí Minh</option><option value="92">thành phố Cần Thơ</option><option value="02">tỉnh Hà Giang</option>	<option value="04">tỉnh Cao Bằng</option><option value="06">tỉnh Bắc Kạn</option>		<option value="08">tỉnh Tuyên Quang</option><option value="10">tỉnh Lào Cai</option>	<option value="11">tỉnh Điện Biên</option><option value="12">tỉnh Lai Châu</option>	<option value="14">tỉnh Sơn La</option>	<option value="15">tỉnh Yên Bái</option><option value="17">tỉnh Hoà Bình</option><option value="19">tỉnh Thái Nguyên</option>						<option value="20">tỉnh Lạng Sơn</option>						<option value="22">tỉnh Quảng Ninh</option>						<option value="24">tỉnh Bắc Giang</option>						<option value="25">tỉnh Phú Thọ</option>						<option value="26">tỉnh Vĩnh Phúc</option>						<option value="27">tỉnh Bắc Ninh</option>						<option value="30">tỉnh Hải Dương</option>						<option value="33">tỉnh Hưng Yên</option>						<option value="34">tỉnh Thái Bình</option>						<option value="35">tỉnh Hà Nam</option>						<option value="36">tỉnh Nam Định</option>						<option value="37">tỉnh Ninh Bình</option>					<option value="38">tỉnh Thanh Hóa</option>						<option value="40">tỉnh Nghệ An</option>						<option value="42">tỉnh Hà Tĩnh</option>						<option value="44">tỉnh Quảng Bình</option>						<option value="45">tỉnh Quảng Trị</option>						<option value="46">tỉnh Thừa Thiên Huế</option>						<option value="49">tỉnh Quảng Nam</option>						<option value="51">tỉnh Quảng Ngãi</option>						<option value="52">tỉnh Bình Định</option>						<option value="54">tỉnh Phú Yên</option>						<option value="56">tỉnh Khánh Hòa</option><option value="58">tỉnh Ninh Thuận</option><option value="60">tỉnh Bình Thuận</option>						<option value="62">tỉnh Kon Tum</option>						<option value="64">tỉnh Gia Lai</option>						<option value="66">tỉnh Đắk Lắk</option>						<option value="67">tỉnh Đắk Nông</option>						<option value="68">tỉnh Lâm Đồng</option>						<option value="70">tỉnh Bình Phước</option>						<option value="72">tỉnh Tây Ninh</option>						<option value="74">tỉnh Bình Dương</option><option value="75">tỉnh Đồng Nai</option>	<option value="77">tỉnh Bà Rịa - Vũng Tàu</option>						<option value="80">tỉnh Long An</option>					<option value="82">tỉnh Tiền Giang</option>						<option value="83">tỉnh Bến Tre</option>	<option value="84">tỉnh Trà Vinh</option>						<option value="86">tỉnh Vĩnh Long</option>					<option value="87">tỉnh Đồng Tháp</option>						<option value="89">tỉnh An Giang</option>						<option value="91">tỉnh Kiên Giang</option>						<option value="93">tỉnh Hậu Giang</option>						<option value="94">tỉnh Sóc Trăng</option>						<option value="95">tỉnh Bạc Liêu</option><option value="96">tỉnh Cà Mau</option></select><select id="noiDenHuyenId' + x + '" name="noiDenHuyenId' + x + '" class="input" onchange="changeQuanHuyen(&#39;noiDenHuyenId' + x + '&#39;,&#39;noiDenXaId' + x + '&#39;);"><option value="">-- Chọn Quận/Huyện --</option></select>  <select id="noiDenXaId' + x + '" name="noiDenXaId' + x + '" class="input"><option value="">-- Chọn Phường/Xã --</option></select><input id="persionContact' + x + '" type="text" class="input" placeholder="Số, đường/Tổ/Thôn/Xóm"> </fieldset>';
	  document.getElementById('declareGroup').lastElementChild.insertAdjacentHTML("afterend",html);
  }

  function removeFieldFunction(){
	x--;
	document.getElementById('declareGroup').lastElementChild.remove();
  }

	//----------------------Tinh/thanh-----------------------------------
	var idTinh = '', idHuyen = '', idXa = '';
	function changeTinhThanh(curIdTinh,curIdHuyen,curIdXa){
		idTinh = curIdTinh;
		idHuyen = curIdHuyen;
		idXa = curIdXa;
		document.getElementById(idHuyen).innerHTML = '<option value="">-- Chọn Quận/Huyện --</option>';
		document.getElementById(idXa).innerHTML = '<option value="">-- Chọn Phường/Xã --</option>';
		capNhatDVHC(idTinh, idHuyen);
	}

	//-----------------------Quan/huyen------------------------------------
	function changeQuanHuyen(curIdHuyen,curIdXa){
		idHuyen = curIdHuyen;
		idXa = curIdXa;
		document.getElementById(idXa).innerHTML = '<option value="">-- Chọn Phường/Xã --</option>';
		capNhatDVHC(idHuyen, idXa);
	}	

	 async function capNhatDVHC(id1, id2){
		dbPromise.then(function(db) {
			var tx = db.transaction('dvhcStore', 'readonly');
			var store = tx.objectStore('dvhcStore');
			var index = store.index('CapTren');
			var id = document.getElementById(id1).value
			return index.openCursor(id)	  
		  }).then(function readCursor(cursor){
			if (!cursor) {
				return;
			}
			var optionText;
			var optionValue;
			var sel = document.getElementById(id2);
			var opt = document.createElement('option'); // create new option element
					optionText = cursor.value.Ten;
					optionValue = cursor.value.MaDVHC;
					opt.appendChild( document.createTextNode(optionText) );// create text node to add to option element (opt)
					opt.value = optionValue; // set value property of opt
					sel.appendChild(opt); // add opt to end of select box (sel)
					//console.log(opt.value);
			  return cursor.continue().then(readCursor);
			}).then(function() {
			  console.log('Done cursoring');
			  return;
			});
	}

	function saveCode(){
		date = Date(),
		userForm = document.getElementById('userForm'),
		strHTML = userForm.outerHTML,
		userStored = [
			{
				dataIndex: "01",
				data: userCodeSaved,
				date: date
			},
			{
				dataIndex: "02",
				data: formData,
				date: date,
				numPlace: x
			}
		];

		storeUser();
	}

	function retrieveCode(){	
		dbPromise.then(function(db){
			var tx = db.transaction('userStore', 'readonly');
			var store = tx.objectStore('userStore');
			return store.get("01");}
			).then(function (data){
				var x = data.data;
				qrcode.makeCode(x);
				var qrcodeView = document.getElementById("qrcodeView");
				var formView = document.getElementById("declareForm");
				var qrdescript = document.getElementById("qrdescript");
				var titleDeclare = document.getElementById("title-declare");
				formView.style.display = "none"
				qrcodeView.style.display = "block";
				titleDeclare.style.display = "none";
				qrdescript.style.display  = "block";
			})		
	}

	async function retrieveForm(){	
		dbPromise.then(function(db){
			var tx = db.transaction('userStore', 'readonly');
			var store = tx.objectStore('userStore');
			return store.get("02");}
			).then(function (data){
				var x = data.data;
				document.getElementById("user").value = x[1];
				document.getElementById("birthday").value = x[2];
				switch(x[3]){
					case "nam":
						document.getElementById('male').checked = true;
						break;
					case "nu":
						document.getElementById('female').checked = true;
						break;
					case "khac":
						document.getElementById('otherSex').checked = true;
						break;
				}
				document.getElementById("unit_").value = x[4];
				document.getElementById("phoneNumber").value = x[5];

				switch(x[6]){
					case "chua":
						document.getElementById('vacInjectNo').checked = true;
						break;
					case "roi":
						document.getElementById('vacInjectYes').checked = true;
						break;
					default:
						break;
				}
				document.getElementById("vactypeInput").value = x[7];

				switch(x[8]){
					case "khong":
						document.getElementById('symptomsNo').checked = true;
						break;
					case "co":
						document.getElementById('symptomsYes').checked = true;
						break;
				}

				for(var i = 0; i < data.numPlace; i++){
					if(i>0) addFieldFunction();
					document.getElementById("timeContact1"+(i+1)).value = x[9+8*(i)];
					document.getElementById("dateContact1"+(i+1)).value = x[10+8*(i)];
					document.getElementById("timeContact2"+(i+1)).value = x[11+8*(i)];
					document.getElementById("dateContact2"+(i+1)).value = x[12+8*(i)];
					
					document.getElementById("noiDenTinhId"+ (i+1)).value = x[13+8*(i)];
					capNhatDVHC("noiDenTinhId"+(i+1), "noiDenHuyenId"+ (i+1));
				} //for
				return data;				
				
			}).then(sleeper(500)).then(function(data){
				var x = data.data;
				for(var i = 0; i < data.numPlace; i++){
				document.getElementById("noiDenHuyenId"+ (i+1)).value = x[14+8*(i)];
				console.log(document.getElementById("noiDenHuyenId"+ (i+1)).value)
				capNhatDVHC("noiDenHuyenId"+(i+1), "noiDenXaId"+ (i+1));
				} // for	
				return data;

			}).then(sleeper(500)).then(function(data){
				var x = data.data;
				for(var i = 0; i < data.numPlace; i++){
					document.getElementById("noiDenXaId"+ (i+1)).value = x[15+8*(i)];
					document.getElementById("persionContact"+ (i+1)).value = x[16+8*(i)];
				}

			}) //then
	}


	function sleeper(ms) {
		return function(x) {
		  return new Promise(resolve => setTimeout(() => resolve(x), ms));
		};
	  }