/**
 * 데이터 암, 복호화
 * secret.js는 디버깅 및 개발용으로만 사용하며, 사용 페이지에서는 코드 난독화를 위해 secret.min.js만 사용
 * 
 * @author kanghj
 */
var Secret = {
		getKey: null,
		setEncrypt: null,
		setDecrypt: null
};

// javascript 난독화 시킬 때 나머지연산자(%) 땜시 오류 발생해서 따로 뺌
function getMod(a, b) {return a % b;}

/**
 * 해당 사이트의 자바스크립트 난독화는 이미지 형태로 암호화
 * 
 * 코드 수정시 http://javascript2img.com/ 해당 사이트에서 
 * 자바스크립트를 난독화 하여 secret.min.js에 반영 해야 함
 */
// key 은닉화를 위해 클로저 사용
Secret.getKey = function(pswd) {
	return function() {
		return pswd
	}
}('20180806');// 가라 비밀번호

// 암호화: 문자 -> 아스키코드-비밀번호(아스키코드) -> 유니코드
Secret.setEncrypt = function(data) {
	var encData='', key=Secret.getKey(), ascii;
	for(var i=0; i<data.length; i++) {
	    ascii = data.charCodeAt(i) - key.charCodeAt(getMod(i, key.length));
	    if(i!==0) encData += ',';
	    encData += ascii;
	}
	return escape(encData);
}
// 복호화: 유니코드 -> 아스키코드+비밀번호(아스키코드) -> 문자
Secret.setDecrypt = function(data) {
	var decData=unescape(data).split(','), key=Secret.getKey(), data = '';
	for(var i=0; i<decData.length; i++)
		data += String.fromCharCode(Number(decData[i]) + key.charCodeAt(getMod(i, key.length)));
	return data;
}