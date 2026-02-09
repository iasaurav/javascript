
  
  

  function copyText(t) {
    navigator.clipboard.writeText(t);
  }

document.addEventListener("DOMContentLoaded", () => {
    
    
  
  const input =prompt("").trim();

const [id, gid] = input.split(':');
  
          
    const base = r => `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&tq&gid=${gid}&range=${r}`;

  
    
 const tables = [ {
        id: "drive_result",
        range: "A2:Z18",
        headers: ['Name', ''],
        row: c => {
          const v = i => c[i]?.f || c[i]?.v || '';
          return `<tr>
  ${v(1)
  ? `<td><a href="https://drive.google.com/uc?export=download&id=${v(1)}"target="_self">${v(0)}<a></td>`
  : `<td><span class="copy" onclick="copyText('${v(4)}')">${v(0)}</span></td>`}

    
   
    
${v(2) ? `<td><span class="copy" onclick="copyText('${v(2)}')">${v(2)}</span>` : ''}

${v(3) ? ` | <span class="copy" onclick="copyText('${v(3)}')">${v(3)}</span>` : '</td>'}






  
  </tr>`;
        }
      },
   
  
  



   
   
   
   
          
          
          
  
  
  
  
  
  

   
   
   
   
   
   
   
   
  
    
   
   
   
   
   
      
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
     
   ];

    
    
    
    
// Auto-create containers and fetch data
    tables.forEach(({id,range,headers,row }) => {
      const container = document.createElement("div");
      container.id = id;
      container.textContent = "Loading...";
      document.body.appendChild(container);

      fetch(base(range))
        .then(r => r.text())
        .then(d => {
          const rows = JSON.parse(d.slice(47, -2)).table.rows;
          let html = `<table><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
          rows.forEach(r => html += row(r.c));
          container.innerHTML = html + '</table></br>';
        });
    });
  });

  
  
  


 













  
  






 










          
         