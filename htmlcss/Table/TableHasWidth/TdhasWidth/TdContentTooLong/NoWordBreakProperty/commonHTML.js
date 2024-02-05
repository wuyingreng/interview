const commonHTML = `<table>
<thead>
  <th class="one">noe1</th>
  <th class="two">我是非连续字符</th>
</thead>
<tbody>
  <tr>
    <td class="one">noe1</td>
    <td class="two">iamcontinuouswrord</td>
  </tr>
  <tr>
    <td class="one">999999</td>
    <td class="two">888888</td>
  </tr>
</tbody>
</table>`

document.getElementById('table-container').innerHTML = commonHTML;