let members=[

{name:"Lucas_Arora",rank:10,level:40,number:"309494",password:"lucas9389",money:0,war:0},

{name:"Arushkumar_Kumar",rank:9,level:36,number:"309413",password:"arush6327",money:0,war:0}

];

let user=null;

function login(){

let name=document.getElementById("name").value;
let rank=parseInt(document.getElementById("rank").value);
let pass=document.getElementById("password").value;

user=members.find(m=>m.name===name && m.rank===rank && m.password===pass);

if(!user){
alert("Wrong Login Details");
return;
}

document.getElementById("loginPage").style.display="none";
document.getElementById("dashboard").style.display="block";

document.getElementById("welcome").innerText="Welcome "+user.name;

if(user.rank>=7){
document.getElementById("staffBtn").style.display="block";
}

if(user.rank==9 || user.rank==10){
document.getElementById("deputyBtn").style.display="block";
}

if(user.rank<10){
document.getElementById("adminBtn").style.display="none";
}

}

function openPage(page){

document.getElementById("dashboard").style.display="none";
document.getElementById("page").style.display="block";

let content=document.getElementById("content");

if(page==="members"){

document.getElementById("title").innerText="Members";

let html="<table><tr><th>No</th><th>Name</th><th>Rank</th><th>Level</th><th>Number</th></tr>";

members.forEach((m,i)=>{

html+=`
<tr>
<td>${i+1}</td>
<td class="memberName">${m.name}</td>
<td>${m.rank}</td>
<td class="level">${m.level}</td>
<td>${m.number}</td>
</tr>
`;

});

html+="</table>";

content.innerHTML=html;

}

if(page==="players"){

document.getElementById("title").innerText="Players Info";

let html="<table><tr><th>Name</th><th>Contribution</th><th>War</th><th>Action</th></tr>";

members.forEach((m,i)=>{

let action="";

if(user.rank==10){

action=`
<button class="warAdd" onclick="addWar(${i})">+</button>
<button class="warRemove" onclick="removeWar(${i})">-</button>
`;

}

html+=`
<tr>
<td class="memberName">${m.name}</td>
<td class="contribution">${m.money}</td>
<td class="war">${m.war}</td>
<td>${action}</td>
</tr>
`;

});

html+="</table>";

content.innerHTML=html;

}

if(page==="rules"){

document.getElementById("title").innerText="Family Rules";

content.innerHTML=`
<div class="rulesBox">
<p class="ruleColor">

👻 GHOST MASTER FAMILY RULES 👻

1️⃣ Respect everyone  
2️⃣ No toxicity  
3️⃣ Follow war orders  
4️⃣ Stay active  
5️⃣ No internal fights  
6️⃣ Follow server rules  
7️⃣ No cheating  
8️⃣ War proof required  
9️⃣ Maintain reputation  
🔟 Reward system active  

</p>
</div>
`;

}

if(page==="staff"){

document.getElementById("title").innerText="Senior Staff Rules";

content.innerHTML=`
<div class="rulesBox">

1. Add members  
2. Warn rule breakers  
3. Maintain discipline  
4. Help leader  

</div>
`;

}

if(page==="deputy"){

document.getElementById("title").innerText="Deputy Rules";

content.innerHTML=`
<div class="rulesBox">

1. Manage family when leader offline  
2. Help leader in wars  
3. Check member activity  
4. Report problems  

</div>
`;

}

if(page==="admin"){

document.getElementById("title").innerText="Admin Panel";

content.innerHTML=`

<h3>Add Member</h3>

<input id="newName" placeholder="Name">
<input id="newRank" placeholder="Rank">
<input id="newLevel" placeholder="Level">
<input id="newNumber" placeholder="Number">
<input id="newPass" placeholder="Password">

<button onclick="addMember()">Add Member</button>

`;

}

}

function addMember(){

let name=document.getElementById("newName").value;
let rank=parseInt(document.getElementById("newRank").value);
let level=parseInt(document.getElementById("newLevel").value);
let number=document.getElementById("newNumber").value;
let pass=document.getElementById("newPass").value;

members.push({name,rank,level,number,password:pass,money:0,war:0});

alert("Member Added");

}

function addWar(i){
members[i].war++;
openPage("players");
}

function removeWar(i){
if(members[i].war>0) members[i].war--;
openPage("players");
}

function back(){
document.getElementById("page").style.display="none";
document.getElementById("dashboard").style.display="block";
}

function logout(){
location.reload();
}
