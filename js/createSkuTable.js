var alreadySetSkuVals = {};//已经设置的SKU值数据
$(function () {
	//sku属性发生改变时,进行表格创建
	$(document).on("change", '.sku_value', function () {
		credS()
	});
});
/**
 * 获取已经设置的SKU值 
 */
function getAlreadySetSkuVals() {
	alreadySetSkuVals = {};
	//获取设置的SKU属性值
	$("tr[class*='sku_table_tr']").each(function () {
		var skuPrice = $(this).find("input[type='number'][class*='setting_sku_price']").val();//SKU价格
		var skuStock = $(this).find("input[type='number'][class*='setting_sku_stock']").val();//SKU库存
		var skuSerial = $(this).find("input[type='text'][class*='setting_sku_serial']").val();//SKU库存
		var skuBarcode = $(this).find("input[type='text'][class*='setting_sku_barcode']").val();//SKU库存
		if (skuPrice || skuStock) {//已经设置了全部或部分值
			var propvalids = $(this).attr("propvalids");//SKU值主键集合
			alreadySetSkuVals[propvalids] = {
				"skuPrice": skuPrice,
				"skuStock": skuStock,
				"skuSerial": skuSerial,
				"skuBarcode": skuBarcode
			}
		}
	});
}
function credS() {
	getAlreadySetSkuVals();//获取已经设置的SKU值
	var b = true;
	var skuTypeArr = [];//存放SKU类型的数组
	var totalRow = 1;//总行数
	//获取元素类型
	$(".SKU_TYPE").each(function () {
		//SKU类型节点
		var skuTypeNode = $(this).children("li");
		var skuTypeObj = {};//sku类型对象
		//SKU属性类型标题
		skuTypeObj.skuTypeTitle = $(skuTypeNode).attr("sku-type-name");
		//SKU属性类型主键
		var propid = $(skuTypeNode).attr("propid");
		skuTypeObj.skuTypeKey = propid;
		//是否是必选SKU 0：不是；1：是；
		var is_required = $(skuTypeNode).attr("is_required");
		skuValueArr = [];//存放SKU值得数组
		//SKU相对应的节点
		var skuValNode = $(this).next();
		//获取SKU值
		var skuValCheckBoxs = $(skuValNode).find("input[type='checkbox'][class*='sku_value']");
		var checkedNodeLen = 0;//选中的SKU节点的个数
		$(skuValCheckBoxs).each(function () {
			if ($(this).is(":checked")) {
				var skuValObj = {};//SKU值对象
				skuValObj.skuValueTitle = $(this).val();//SKU值名称
				skuValObj.skuValueId = $(this).attr("propvalid");//SKU值主键
				skuValObj.skuPropId = $(this).attr("propid");//SKU类型主键
				skuValueArr.push(skuValObj);
				checkedNodeLen++;
			}
		});
		if (is_required && "1" == is_required) {//必选sku
			if (checkedNodeLen <= 0) {//有必选的SKU仍然没有选中
				b = false;
				return false;//直接返回
			}
		}
		if (skuValueArr && skuValueArr.length > 0) {
			totalRow = totalRow * skuValueArr.length;
			skuTypeObj.skuValues = skuValueArr;//sku值数组
			skuTypeObj.skuValueLen = skuValueArr.length;//sku值长度
			skuTypeArr.push(skuTypeObj);//保存进数组中
		}
	});
	var SKUTableDom = "";//sku表格数据
	//开始创建行
	if (b) {//必选的SKU属性已经都选中了
		SKUTableDom += "<table class='skuTable table table-bordered'><tr>";
		//创建表头
		for (var t = 0; t < skuTypeArr.length; t++) {
			SKUTableDom += '<td style="vertical-align: middle;width:60px"><b>' + skuTypeArr[t].skuTypeTitle + '</b></td>';
		}
		SKUTableDom += '<td style="vertical-align: middle;"><b>价格</b></td><td style="vertical-align: middle;"><b>库存</b></td><td style="vertical-align: middle;"><b>商家编码</b></td><td style="vertical-align: middle;"><b>商品条形码</b></td>';
		SKUTableDom += "</tr>";
		//循环处理表体
		for (var i = 0; i < totalRow; i++) {//总共需要创建多少行
			var currRowDoms = "";
			var rowCount = 1;//记录行数
			var propvalidArr = [];//记录SKU值主键
			var propIdArr = [];//属性类型主键
			var propvalnameArr = [];//记录SKU值标题
			var propNameArr = [];//属性类型标题
			for (var j = 0; j < skuTypeArr.length; j++) {//sku列
				var skuValues = skuTypeArr[j].skuValues;//SKU值数组
				var skuValueLen = skuValues.length;//sku值长度
				rowCount = (rowCount * skuValueLen);//目前的生成的总行数
				var anInterBankNum = (totalRow / rowCount);//跨行数
				var point = ((i / anInterBankNum) % skuValueLen);
				propNameArr.push(skuTypeArr[j].skuTypeTitle);
				propIdArr.push(skuTypeArr[j].skuTypeKey);
				if (0 == (i % anInterBankNum)) {//需要创建td
					currRowDoms += '<td rowspan=' + anInterBankNum + ' style="vertical-align: middle;">' + skuValues[point].skuValueTitle + '</td>';
					propvalidArr.push(skuValues[point].skuValueId);
					//propIdArr.push(skuValues[point].skuPropId);
					propvalnameArr.push(skuValues[point].skuValueTitle);
				} else {
					//当前单元格为跨行
					propvalidArr.push(skuValues[parseInt(point)].skuValueId);
					//propIdArr.push(skuValues[parseInt(point)].skuPropId);
					propvalnameArr.push(skuValues[parseInt(point)].skuValueTitle);
				}
			}
			var propvalids = propvalidArr.toString()
			var alreadySetSkuPrice = "";//已经设置的SKU价格
			var alreadySetSkuStock = "";//已经设置的SKU库存
			var alreadySetSkuSerial = "";//已经设置的SKU库存
			var alreadySetSkuBarcode = "";//已经设置的SKU库存
			//赋值
			if (alreadySetSkuVals) {
				var currGroupSkuVal = alreadySetSkuVals[propvalids];//当前这组SKU值
				if (currGroupSkuVal) {
					alreadySetSkuPrice = currGroupSkuVal.skuPrice;
					alreadySetSkuStock = currGroupSkuVal.skuStock;
					alreadySetSkuSerial = currGroupSkuVal.skuSerial;
					alreadySetSkuBarcode = currGroupSkuVal.skuBarcode
				}
			}
			//console.log(propvalids);
			SKUTableDom += '<tr  id="" propvalids=\'' + propvalids + '\' propids=\'' + propIdArr.toString() + '\' propvalnames=\''
				+ propvalnameArr.join(":") + '\'  propnames=\'' + propNameArr.join(":") + '\' class="sku_table_tr">' + currRowDoms
				+ '<td><input type="number" class="setting_sku_price form-control" style="width:80%;margin:0 auto;" id="price" value="'
				+ alreadySetSkuPrice + '"/></td><td><input type="number" class="setting_sku_stock  form-control"  style="width:80%;margin:0 auto;" id="stock" value="'
				+ alreadySetSkuStock + '"  /></td><td><input type="text" class="setting_sku_serial  form-control" style="width:80%;margin:0 auto;" id="serial" value="'
				+ alreadySetSkuSerial + '"/ ></td><td><input type="text" class="setting_sku_barcode  form-control" style="width:80%;margin:0 auto;" id="barcode" value="'
				+ alreadySetSkuBarcode + '" /></td></tr>';
		}
		SKUTableDom += "</table>";
	}
	$("#skuTable").html(SKUTableDom);

	//正则价格
	$(".setting_sku_price").keyup(function () {
		var reg = $(this).val().match(/\d+\.?\d{0,2}/);
		var txt = '';
		if (reg != null) {
			txt = reg[0];
		}
		$(this).val(txt);
	});
	//格式化价格
	$(".setting_sku_price").blur(function () {
		var reg = $(this).val().match(/\d+\.?\d{0,2}/);
		var txt = parseFloat(reg).toFixed(2);
		if (txt == "NaN") {
			$(this).val("");
		} else {
			$(this).val(txt);
		}
	});
	//格式化库存
	$(".setting_sku_stock").blur(function () {
		var stock = $(this).val();
		if (stock.length > 6) {
			var st = parseInt(stock.substr(0, 6));
			$(this).val(st);
		} else {
			var stt = parseInt(stock);
			$(this).val(stt);
		}
	})
}
