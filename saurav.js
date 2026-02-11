
  
  

  function copyText(t) {
    navigator.clipboard.writeText(t);
  }

document.addEventListener("DOMContentLoaded", () => {
const [id, gid] = prompt("sheetid:gid").trim().split(':');
  
          
    const base = r => `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&tq&gid=${gid}&range=${r}`;

  
    
 const tables = [ {
        hint: "*green wale se download ",
        id: "drive_result",
        range: "A2:E20",
        headers: ['Name', ''],
        row: c => {
          const v = i => c[i]?.f || c[i]?.v || '';
          return `<tr>
  ${v(4)

  ? `<td><a href="https://drive.google.com/uc?export=download&id=${v(4)}"target="_self"onclick="navigator.clipboard.writeText('${v(1)}')"style="color:green">${v(0)}<a></td>`

  : `<td>${v(0)}</td>`}

    
   
    
${v(1) ? `<td><span class="copy" onclick="copyText('${v(1)}')">${v(1)}</span>` : ''}

${v(2) ? ` | <span class="copy" onclick="copyText('${v(2)}')">${v(2)}</span>` : ''}

${v(3) ? ` | <span class="copy" onclick="copyText('${v(3)}')">${v(3)}</span>` : '</td>'}




  
  </tr>`;
        }
      }

];

// Auto-create containers and fetch data
    tables.forEach(({hint,id,range,headers,row }) => {
      const container = document.createElement("div");
      container.id = id;
      container.textContent = "Loading...";
      document.body.appendChild(container);

      fetch(base(range))
        .then(r => r.text())
        .then(d => {
          const rows = JSON.parse(d.slice(47, -2)).table.rows;
          let html = `${hint}</br></br><table><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
          rows.forEach(r => html += row(r.c));
          container.innerHTML = html + '</table></br>';
        });
    });
  });
