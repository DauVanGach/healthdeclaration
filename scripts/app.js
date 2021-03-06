	
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
		userCodeSaved = Date();
		var filedContactInf = ''; // Gi?? tr??? l??u bi???n n??i ti???p x??c
		var userText =  document.getElementById("user");
		var birthdayText =  document.getElementById("birthday");
		var unit_Text =  document.getElementById("unit_");
		var phoneNumberText =  document.getElementById("phoneNumber");
		var vacTypeText =  document.querySelector('#vactypeInput').value;
		if(!vacTypeText) vacTypeText = "";
		
		userCodeSaved = userCodeSaved + '%' + x + '%' + userText.value + '%' + birthdayText.value.toString() + '%' + $("input[type='radio'][name='sex']:checked").val() + '%' + unit_Text.value + '%' + phoneNumberText.value.toString() + '%' + $("input[type='radio'][name='vacInject']:checked").val() + '%' + vacTypeText + '%' + $("input[type='radio'][name='symptoms']:checked").val() + '%';
		if(x >= 1){
			for(let  i = 1; i <= x; i++){
				filedContactInf = 	filedContactInf + document.getElementById("timeContact1"+ i).value.toString() + "%" +
									document.getElementById("dateContact1"+ i).value.toString().split("-").reverse().join("-") + "%" +
									document.getElementById("timeContact2"+ i).value.toString() + "%" +
									document.getElementById("dateContact2"+ i).value.toString().split("-").reverse().join("-") + "%" +
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
	  html += '<div id="fieldDeclarre' + x + '"> <fieldset> <legend>?????a ??i???m ' + x + ': </legend>' +  '<input id="timeContact1' + x + '" type="number" class="input" placeholder="T??? gi???" min="0" max="23"><input id="dateContact1' + x + '" type="date" class="input" placeholder="Ng??y"><input id="timeContact2' + x + '" type="number" class="input" placeholder="?????n gi???" min="0" max="23"><input id="dateContact2' + x + '" type="date" class="input" placeholder="Ng??y"><label for="noiDenTinhId' + x + '" class="label">B???n ???? ?????n:</label><select id="noiDenTinhId' + x + '" name="noiDenTinhId' + x + '" class="input" required="true" onchange="changeTinhThanh(&#39;noiDenTinhId' + x + '&#39;,&#39;noiDenHuyenId' + x + '&#39;,&#39;noiDenXaId' + x + '&#39;);"><option value="">-- Ch???n T???nh/Th??nh --</option><option value="01">th??nh ph??? H?? N???i</option><option value="31">th??nh ph??? H???i Ph??ng</option>						<option value="48">th??nh ph??? ???? N???ng</option>	<option value="79">th??nh ph??? H??? Ch?? Minh</option><option value="92">th??nh ph??? C???n Th??</option><option value="02">t???nh H?? Giang</option>	<option value="04">t???nh Cao B???ng</option><option value="06">t???nh B???c K???n</option>		<option value="08">t???nh Tuy??n Quang</option><option value="10">t???nh L??o Cai</option>	<option value="11">t???nh ??i???n Bi??n</option><option value="12">t???nh Lai Ch??u</option>	<option value="14">t???nh S??n La</option>	<option value="15">t???nh Y??n B??i</option><option value="17">t???nh Ho?? B??nh</option><option value="19">t???nh Th??i Nguy??n</option>						<option value="20">t???nh L???ng S??n</option>						<option value="22">t???nh Qu???ng Ninh</option>						<option value="24">t???nh B???c Giang</option>						<option value="25">t???nh Ph?? Th???</option>						<option value="26">t???nh V??nh Ph??c</option>						<option value="27">t???nh B???c Ninh</option>						<option value="30">t???nh H???i D????ng</option>						<option value="33">t???nh H??ng Y??n</option>						<option value="34">t???nh Th??i B??nh</option>						<option value="35">t???nh H?? Nam</option>						<option value="36">t???nh Nam ?????nh</option>						<option value="37">t???nh Ninh B??nh</option>					<option value="38">t???nh Thanh H??a</option>						<option value="40">t???nh Ngh??? An</option>						<option value="42">t???nh H?? T??nh</option>						<option value="44">t???nh Qu???ng B??nh</option>						<option value="45">t???nh Qu???ng Tr???</option>						<option value="46">t???nh Th???a Thi??n Hu???</option>						<option value="49">t???nh Qu???ng Nam</option>						<option value="51">t???nh Qu???ng Ng??i</option>						<option value="52">t???nh B??nh ?????nh</option>						<option value="54">t???nh Ph?? Y??n</option>						<option value="56">t???nh Kh??nh H??a</option><option value="58">t???nh Ninh Thu???n</option><option value="60">t???nh B??nh Thu???n</option>						<option value="62">t???nh Kon Tum</option>						<option value="64">t???nh Gia Lai</option>						<option value="66">t???nh ?????k L???k</option>						<option value="67">t???nh ?????k N??ng</option>						<option value="68">t???nh L??m ?????ng</option>						<option value="70">t???nh B??nh Ph?????c</option>						<option value="72">t???nh T??y Ninh</option>						<option value="74">t???nh B??nh D????ng</option><option value="75">t???nh ?????ng Nai</option>	<option value="77">t???nh B?? R???a - V??ng T??u</option>						<option value="80">t???nh Long An</option>					<option value="82">t???nh Ti???n Giang</option>						<option value="83">t???nh B???n Tre</option>	<option value="84">t???nh Tr?? Vinh</option>						<option value="86">t???nh V??nh Long</option>					<option value="87">t???nh ?????ng Th??p</option>						<option value="89">t???nh An Giang</option>						<option value="91">t???nh Ki??n Giang</option>						<option value="93">t???nh H???u Giang</option>						<option value="94">t???nh S??c Tr??ng</option>						<option value="95">t???nh B???c Li??u</option><option value="96">t???nh C?? Mau</option></select><select id="noiDenHuyenId' + x + '" name="noiDenHuyenId' + x + '" class="input" onchange="changeQuanHuyen(&#39;noiDenHuyenId' + x + '&#39;,&#39;noiDenXaId' + x + '&#39;);"><option value="">-- Ch???n Qu???n/Huy???n --</option></select>  <select id="noiDenXaId' + x + '" name="noiDenXaId' + x + '" class="input"><option value="">-- Ch???n Ph?????ng/X?? --</option></select><input id="persionContact' + x + '" type="text" class="input" placeholder="S???, ???????ng/T???/Th??n/X??m"> </fieldset>';
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
		document.getElementById(idHuyen).innerHTML = '<option value="">-- Ch???n Qu???n/Huy???n --</option>';
		document.getElementById(idXa).innerHTML = '<option value="">-- Ch???n Ph?????ng/X?? --</option>';
		capNhatDVHC(idTinh, idHuyen);
	}

	//-----------------------Quan/huyen------------------------------------
	function changeQuanHuyen(curIdHuyen,curIdXa){
		idHuyen = curIdHuyen;
		idXa = curIdXa;
		document.getElementById(idXa).innerHTML = '<option value="">-- Ch???n Ph?????ng/X?? --</option>';
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