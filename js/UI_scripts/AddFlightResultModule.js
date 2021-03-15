firstAddButton = () => {
    if (document.getElementById('firstAddRowButton') != undefined)
        document.getElementById('firstAddRowButton').remove();
    let tr = document.createElement('tr');
    tr.className = 'firstAddTableRow';
    tr.innerHTML = `<td class="firstTableNumber"></td>
                    <td>select</td>
                    <td><input type="number" class="firstFrequncyInput" step="0.025" min="100" max="400" placeholder="주파수"/></td>
                    <td><input type="number" class="firstTXMInput" step="1" min="0" max="5" placeholder="TX-Main 0~5"/></td>
                    <td><input type="number" class="firstRXMInput" step="1" min="0" max="5" placeholder="RX-Main 0~5"/></td>
                    <td><input type="number" class="firstTXSInput" step="1" min="0" max="5" placeholder="TX-Stby 0~5"/></td>
                    <td><input type="number" class="firstRXSInput" step="1" min="0" max="5" placeholder="RX-Stby 0~5"/></td>
                    <td><input type="number" class="firstDistance" step="100" min="3000" max="50000" placeholder="Distance (ft)"/></td>
                    <td><input type="number" class="firstAngle" step=".1" min="0" max="359.9" placeholder="Angle"/></td>
                    <td class="firstAddTableButtonForm"> </td>`

    document.getElementById('firstAddTableBody').appendChild(tr);


    for (i in document.getElementsByClassName('firstFrequncyInput')) {
        if (i == document.getElementsByClassName('firstFrequncyInput').length - 1) {
            document.getElementsByClassName('firstAddTableButtonForm')[i].innerHTML = `<div style="display: flex">
                                                                                        <div class="firstAddRowButton" id="firstAddRowButton" tabindex="0" onfocus="firstAddButton()">+</div>
                                                                                        <div class="firstAddRowButton" tabindex="0" onclick="firstDelButton(${i})">-</div>
                                                                                        </div>`;
        } else if (i == document.getElementsByClassName('firstFrequncyInput').length - 2) {
            document.getElementsByClassName('firstAddTableButtonForm')[i].innerHTML = `<div class="firstAddRowButton" tabindex="0" onclick="firstDelButton(${i})">-</div>`;
        } else {
        }
    }

    for (i in document.getElementsByClassName('firstFrequncyInput')) {
        document.getElementsByClassName('firstTableNumber')[i].innerText = parseInt(i) + 1
    }

    document.getElementsByClassName('firstFrequncyInput')[document.getElementsByClassName('firstFrequncyInput').length - 1].focus();
}

firstAddRowConfirmOnFocus = () => {

    if (document.getElementById('firstTitleInput').value == '') {
        alert('비행검사명이 입력되지 않았습니다.')
        return document.getElementById('firstTitleInput').focus();
    } else if (document.getElementById('firstDateInput').value == '') {
        alert('날짜가 입력되지 않았습니다.')
        return document.getElementById('firstDateInput').focus();
    } else if (document.getElementById('firstRouteUpload').value == '') {
        if (!confirm('경로를 추가하지 않고 진행할까요?')) {
            document.getElementById('firstRouteUpload').focus()
            return;
        }

    }

    if (!confirm(
        '비행검사명 : ' + document.getElementById('firstTitleInput').value
        + '\n날짜 : ' + document.getElementById('firstDateInput').value
        + (document.getElementById('firstRouteUpload').value == '' ?
        '' : '\n파일명 : ' + document.getElementById('firstRouteUpload').files[0].name)
        + '\n위 정보로 데이터를 추가하시겠습니까?')) {
        document.getElementById('firstTitleInput').focus();
        return;
    }

    firstAddButton();
    onRouteUpload(event);
    document.getElementById('firstAddButton').innerText = '완료';
    document.getElementById('firstAddButton').onfocus = '';
    document.getElementById('firstAddButton').visibility = 'hidden';
    document.getElementById('firstTitleInput').disabled = true;
    document.getElementById('firstDateInput').disabled = true;
    document.getElementById('firstRouteUpload').disabled = true;
}

afterAddRow = () => {


}

firstDelButton = (idx) => {
    document.getElementsByClassName('firstAddTableRow')[idx].remove();

    for (i in document.getElementsByClassName('firstFrequncyInput')) {
        if (i == document.getElementsByClassName('firstFrequncyInput').length - 1) {
            document.getElementsByClassName('firstAddTableButtonForm')[i].innerHTML = `<div style="display: flex">
                                                                                        <div class="firstAddRowButton" id="firstAddRowButton" tabindex="0" onfocus="firstAddButton()">+</div>
                                                                                        <div class="firstAddRowButton" tabindex="0" onclick="firstDelButton(${i})">-</div>
                                                                                        </div>`;
        } else if (i == document.getElementsByClassName('firstFrequncyInput').length - 2) {
            document.getElementsByClassName('firstAddTableButtonForm')[i].innerHTML = `<div class="firstAddRowButton" tabindex="0" onclick="firstDelButton(${i})">-</div>`;
        } else {
        }
    }

    for (i in document.getElementsByClassName('firstFrequncyInput')) {
        document.getElementsByClassName('firstTableNumber')[i].innerText = parseInt(i) + 1
    }

    document.getElementsByClassName('firstFrequncyInput')[document.getElementsByClassName('firstFrequncyInput').length - 1].focus();
}

confirmData = async () => {
    if (document.getElementById('firstTitleInput').value == '') {
        alert('비행검사명이 입력되지 않았습니다.')
        return;
    } else if (document.getElementById('firstDateInput').value == '') {
        alert('날짜가 입력되지 않았습니다.')
        return;
    }
    if (document.getElementsByClassName('firstFrequncyInput').length != 0) {
        for (i in document.getElementsByClassName('firstFrequncyInput')) {
            if (document.getElementsByClassName('firstFrequncyInput')[i].value == "") {
                alert(document.getElementsByClassName('firstTableNumber')[i].innerText + "번째 열의 주파수가 입력되지 않았습니다")
                return
            }
            if ((document.getElementsByClassName('firstTXMInput')[i].value == "" || document.getElementsByClassName('firstRXMInput')[i].value == "") &&
                (document.getElementsByClassName('firstTXSInput')[i].value == "" || document.getElementsByClassName('firstRXSInput')[i].value == "")) {
                alert(document.getElementsByClassName('firstTableNumber')[i].innerText + "번째 열의 주파수 점검값(Main 또는 Stby)을 입력해주세요.")
            }

        }
    } else {
        alert("점검값을 추가해주세요.")
    }
    let result = {
        a:1,
        b:2
    }

    fetch('http://localhost:3000/hello', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            result
        })
    }).then(res => console.log(res.json()))

}