(this["webpackJsonpcryptex-2020-frontend"]=this["webpackJsonpcryptex-2020-frontend"]||[]).push([[0],{120:function(e,t,a){e.exports=a.p+"static/media/128x128.87e7ea2c.png"},215:function(e,t,a){e.exports=a(441)},220:function(e,t,a){},221:function(e,t,a){},241:function(e,t,a){},242:function(e,t,a){e.exports=a.p+"static/media/bg.dd750d5d.png"},271:function(e,t,a){},320:function(e,t,a){},327:function(e,t,a){},328:function(e,t,a){},329:function(e,t,a){},439:function(e,t,a){},441:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(3),o=a.n(l),i=(a(220),a(16)),c=a(17),s=a(19),u=a(18),d=a(20),m=(a(221),a(153)),h=a(55),p=a(26),g=a(208),f=a.n(g),b=a(148),v=(a(120),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).authenticate=a.authenticate.bind(Object(p.a)(a)),a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"parseHash",value:function(){this.auth0=new b.a.WebAuth({domain:"cryptex20.auth0.com",clientID:"nl87FH8EoPD4EFqJMYBIJQBr107BDlMZ"}),this.auth0.parseHash((function(e,t){if(e)return console.log(e);null!==t&&null!==t.accessToken&&null!==t.idToken&&(localStorage.setItem("access_token",t.accessToken),localStorage.setItem("id_token",t.idToken),localStorage.setItem("email",JSON.stringify(t.idTokenPayload)),window.location=window.location.href.substr(0,window.location.href.indexOf("")))}))}},{key:"authenticate",value:function(){this.WebAuth=new b.a.WebAuth({domain:"cryptex20.auth0.com",clientID:"nl87FH8EoPD4EFqJMYBIJQBr107BDlMZ",scope:"openid email",audience:"https://cryptex20.auth0.com/api/v2/",responseType:"token id_token",redirectUri:"http://localhost:3000"}),this.WebAuth.authorize()}},{key:"setup",value:function(){f.a.ajaxSetup({beforeSend:function(e){localStorage.getItem("access_token")&&e.setRequestHeader("Authorization","Bearer "+localStorage.getItem("access_token"))}})}},{key:"setState",value:function(){var e=localStorage.getItem("id_token");this.loggedIn=!!e}},{key:"componentWillMount",value:function(){this.setup(),this.parseHash(),this.setState()}},{key:"componentDidMount",value:function(){this.authenticate()}},{key:"render",value:function(){return r.a.createElement("div",null)}}]),t}(r.a.Component)),y=(a(222),a(116)),E=(a(158),a(74)),k=(a(159),a(85)),x=(a(160),a(39)),w=(a(231),a(5)),S=(a(233),a(76)),C=(a(206),a(86)),O=(a(239),a(88)),j=(a(241),a(242),a(15)),N=a.n(j),I=a(52),A=(a(63),a(34)),T=(a(89),a(31)),L=a(71),D=a(445),F=a(446),z=a(447);a(271);N.a.defaults.headers.common.Authorization="Bearer "+localStorage.getItem("access_token");var _=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).state={name:"",username:"",phone:""},e.handleInputChange=e.handleInputChange.bind(Object(p.a)(e)),e.submitForm=e.submitForm.bind(Object(p.a)(e)),e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"handleInputChange",value:function(e){var t=e.target,a="checkbox"===t.type?t.checked:t.value,n=t.name;this.setState(Object(L.a)({},n,a))}},{key:"submitForm",value:function(){N.a.get("https://cryptex.elan.org.in/api/adduser?idToken="+localStorage.getItem("id_token")+"&name="+this.state.name+"&username="+this.state.username+"&phonenumber="+this.state.phone).then((function(e){var t=e.data.errorCode;"Success"===t?(T.a.success("Created user"),setTimeout((function(){window.location.replace("/")}),1e3)):"Duplicate username"===t?T.a.error("Duplicate username"):"Invalid username"===t||""===t?T.a.error("Invalid username. Make sure it's at least 8 characters long. "):T.a.error("Unknown error. Please write to us at cryptex@elan.org.in. ")})).catch((function(e){localStorage.clear(),window.location.replace("/")}))}},{key:"render",value:function(){return r.a.createElement(D.a,{style:{textAlign:"center",marginTop:"20vh"}},r.a.createElement(F.a,null,r.a.createElement(z.a,{type:"text",name:"name",value:this.state.name,placeholder:"Full Name",onChange:this.handleInputChange,className:"fromLeft"}),r.a.createElement("span",null)),r.a.createElement(F.a,null,r.a.createElement(z.a,{type:"text",name:"username",value:this.state.username,placeholder:"Username",onChange:this.handleInputChange,className:"fromCenter"})),r.a.createElement(F.a,null,r.a.createElement(z.a,{type:"text",name:"phone",value:this.state.phone,placeholder:"Phone Number",onChange:this.handleInputChange,className:"fromCenter"})),r.a.createElement(F.a,null,r.a.createElement(A.a,{type:"primary",size:"large",onClick:this.submitForm,style:{marginTop:"20px",backgroundColor:"#24C4A3",borderColor:"#24C4A3",color:"#1e2a3a"}},"Submit")))}}]),t}(r.a.Component),R=(a(315),a(102),a(51)),M=(a(320),R.a.Text);N.a.defaults.headers.common.Authorization="Bearer "+localStorage.getItem("access_token");var B=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).submitForm=e.submitForm.bind(Object(p.a)(e)),e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"submitForm",value:function(){N.a.get("https://cryptex.elan.org.in/api/answer?idToken="+localStorage.getItem("id_token")+"&answer=").then((function(e){e.data.isCorrect?(T.a.success("Correct Answer"),setTimeout((function(){window.location.replace("/")}),1e3)):T.a.error("Incorrect Answer")})).catch((function(e){console.log(e),localStorage.clear(),window.location.replace("/")}))}},{key:"render",value:function(){return r.a.createElement("div",{style:{textAlign:"center",marginTop:"10vh",backgroundColor:"#1E2939",width:"50%",marginLeft:"auto",marginRight:"auto",padding:"30px",fontSize:"1rem"}},r.a.createElement(M,null,"Please read the Rules and Guidelines before you dive in."),r.a.createElement("br",null),r.a.createElement(A.a,{type:"primary",size:"large",onClick:this.submitForm,style:{marginTop:"20px",backgroundColor:"#24C4A3",borderColor:"#24C4A3",color:"#1e2a3a"}},"Dive In"))}}]),t}(r.a.Component);a(327),R.a.Text;N.a.defaults.headers.common.Authorization="Bearer "+localStorage.getItem("access_token");var q=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={username:"Admin",password:""},a.submitForm=a.submitForm.bind(Object(p.a)(a)),a.handleInputChange=a.handleInputChange.bind(Object(p.a)(a)),a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"handleInputChange",value:function(e){var t=e.target,a="checkbox"===t.type?t.checked:t.value,n=t.name;this.setState(Object(L.a)({},n,a))}},{key:"submitForm",value:function(){N.a.get("https://cryptex.elan.org.in/api/answer?idToken="+localStorage.getItem("id_token")+"&answer="+this.state.password).then((function(e){e.data.isCorrect?(T.a.success("Correct Answer"),setTimeout((function(){window.location.replace("/")}),1e3)):T.a.error("Incorrect Answer")})).catch((function(e){localStorage.clear(),window.location.replace("/")}))}},{key:"render",value:function(){return r.a.createElement(D.a,{style:{textAlign:"center",marginTop:"20vh"}},r.a.createElement(F.a,null,r.a.createElement(z.a,{type:"text",name:"name",value:this.state.username,placeholder:"Admin",className:"fromLeft",disabled:!0}),r.a.createElement("span",null)),r.a.createElement(F.a,null,r.a.createElement(z.a,{type:"password",name:"password",value:this.state.password,placeholder:"Password",onChange:this.handleInputChange,className:"fromCenter",onPressEnter:this.submitForm})),r.a.createElement(F.a,null,r.a.createElement(A.a,{type:"primary",size:"large",onClick:this.submitForm,style:{marginTop:"20px",backgroundColor:"#24C4A3",borderColor:"#24C4A3",color:"#1e2a3a"}},"Submit")),r.a.createElement(F.a,null,r.a.createElement(A.a,{type:"primary",size:"large",onClick:this.props.changeState,style:{marginTop:"20px",backgroundColor:"#24C4A3",borderColor:"#24C4A3",color:"#1e2a3a"}},"Back")))}}]),t}(r.a.Component),H=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).state={question:"",clicked:!1},e.changeState=e.changeState.bind(Object(p.a)(e)),e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"changeState",value:function(){this.setState({clicked:!1})}},{key:"componentDidMount",value:function(){var e=this;N.a.get("https://cryptex.elan.org.in/api/question?idToken="+localStorage.getItem("id_token")+"&level="+window.location.pathname.split("/")[2]).then((function(t){console.log(t.data.errorCode),e.setState({question:t.data.question})})).catch((function(e){localStorage.clear(),window.location.replace("/")}))}},{key:"render",value:function(){var e=this;return this.state.clicked?r.a.createElement(q,{changeState:this.changeState}):r.a.createElement("div",{style:{textAlign:"center",marginTop:"10vh",marginLeft:"auto",marginRight:"auto",fontSize:"1rem"}},r.a.createElement("div",{style:{position:"relative"}},r.a.createElement("img",{style:{width:"75%",height:"75%",boxShadow:"4px 16px 16px 4px rgba(0,0,0,0.2)"},src:this.state.question.split(",")[0]}),r.a.createElement("a",{onClick:function(){e.setState({clicked:!0})},style:{top:"36%",left:"40%",width:"20%",height:"24%",display:"block",position:"absolute"}}),r.a.createElement("a",{target:"_blank",href:this.state.question.split(",")[1],style:{top:"76%",left:"63%",width:"22%",height:"20%",display:"block",position:"absolute"}})))}}]),t}(r.a.Component);a(328),R.a.Text;N.a.defaults.headers.common.Authorization="Bearer "+localStorage.getItem("access_token");var P=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).state={question:"",password:""},e.submitForm=e.submitForm.bind(Object(p.a)(e)),e.handleInputChange=e.handleInputChange.bind(Object(p.a)(e)),e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"handleInputChange",value:function(e){var t=e.target,a="checkbox"===t.type?t.checked:t.value,n=t.name;this.setState(Object(L.a)({},n,a))}},{key:"submitForm",value:function(){N.a.get("https://cryptex.elan.org.in/api/answer?idToken="+localStorage.getItem("id_token")+"&answer="+this.state.password).then((function(e){e.data.isCorrect?(T.a.success("Correct Answer"),setTimeout((function(){window.location.replace("/")}),1e3)):T.a.error("Incorrect Answer")})).catch((function(e){localStorage.clear(),window.location.replace("/")}))}},{key:"componentDidMount",value:function(){var e=this;N.a.get("https://cryptex.elan.org.in/api/question?idToken="+localStorage.getItem("id_token")+"&level="+window.location.pathname.split("/")[2]).then((function(t){console.log(t.data.errorCode),e.setState({question:t.data.question})})).catch((function(e){localStorage.clear(),window.location.replace("/")}))}},{key:"render",value:function(){return r.a.createElement("div",{style:{textAlign:"center",marginTop:"10vh",marginLeft:"auto",marginRight:"auto",fontSize:"1rem"}},r.a.createElement("div",{style:{position:"relative"}},r.a.createElement("img",{style:{maxWidth:"60%",maxHeight:"60%",boxShadow:"4px 16px 16px 4px rgba(0,0,0,0.2)"},src:this.state.question})),r.a.createElement(D.a,{style:{textAlign:"center"}},r.a.createElement(F.a,null,r.a.createElement(z.a,{type:"text",name:"password",value:this.state.password,placeholder:"Answer",onChange:this.handleInputChange,className:"fromCenter",onPressEnter:this.submitForm})),r.a.createElement(F.a,null,r.a.createElement(A.a,{type:"primary",size:"large",onClick:this.submitForm,style:{marginTop:"20px",backgroundColor:"#24C4A3",borderColor:"#24C4A3",color:"#1e2a3a"}},"Submit"))))}}]),t}(r.a.Component),W=(a(329),function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(I.Slide,{top:!0},r.a.createElement(k.a,null,r.a.createElement(x.a,{span:5,style:{textAlign:"center",paddingTop:"20px"}},r.a.createElement("h2",{className:"crypt",style:{color:"#24C4A3"}},r.a.createElement("a",{href:"https://elan.org.in/cryptex/elements.html"},"Rules"))),r.a.createElement(x.a,{span:14,style:{textAlign:"center",paddingTop:"20px"}},r.a.createElement("h1",{className:"crypt",style:{color:"#24C4A3"}},"cryptex")),r.a.createElement(x.a,{span:5,style:{textAlign:"center",paddingTop:"20px"}},r.a.createElement("h2",{className:"crypt",style:{color:"#24C4A3"}},r.a.createElement("a",{href:"https://forum.elan.org.in"},"Forum")))))}}]),t}(r.a.Component)),J=O.a.Panel,U=C.a.Column,K={overflow:"hidden",color:"#cff8fa",background:"#1E2939",borderRadius:"0px",padding:"0px"},Q={overflow:"hidden",color:"#cff8fa",background:"#1E2939",borderRadius:"0px"},V={overflow:"hidden",color:"#cff8fa",background:"#1E2939",paddingBottom:".2vh"};function Y(e){console.log(e)}function Z(e){console.log(e)}var G=function(e){function t(e){return Object(i.a)(this,t),Object(s.a)(this,Object(u.a)(t).call(this,e))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.level;switch(console.log("lol"+e),parseInt(e,10)){case-2:return r.a.createElement(_,null);case-1:return r.a.createElement(B,null);case 0:return r.a.createElement(H,null);case 1:case 2:case 3:case 4:case 5:case 6:default:return r.a.createElement(P,null)}}}]),t}(r.a.Component),$=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).state={level:null,leaderboard:[{key:"1",firstName:1,lastName:"Loading",age:1},{key:"2",firstName:2,lastName:"Loading",age:1},{key:"3",firstName:3,lastName:"Loading",age:1},{key:"4",firstName:4,lastName:"Loading",age:1},{key:"5",firstName:5,lastName:"Loading",age:1},{key:"6",firstName:6,lastName:"Loading",age:1}],hoursDifference:0,minutesDifference:0,secondsDifference:0,loadingTable:!0,hints:[],maxLevel:0},e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){var e=this;setInterval((function(){var t=new Date,a=new Date(15800832e5).getTime()-t.getTime(),n=Math.floor(a/1e3/60/60);a-=1e3*n*60*60;var r=Math.floor(a/1e3/60);a-=1e3*r*60;var l=Math.floor(a/1e3);e.setState({hoursDifference:n,minutesDifference:r,secondsDifference:l})}),1e3);var t=window.location.pathname.split("/");if(N.a.get("https://cryptex.elan.org.in/api/level?idToken="+localStorage.getItem("id_token")).then((function(t){e.setState({maxLevel:t.data.level})})),t.length<=2)N.a.get("https://cryptex.elan.org.in/api/level?idToken="+localStorage.getItem("id_token")).then((function(t){e.setState({level:t.data.level}),window.location.replace("/level/"+t.data.level)}));else{this.setState({level:t[2]}),this.setState({loadingTable:!0});var a=this.state.leaderboard,n=this.state.hints;N.a.get("https://cryptex.elan.org.in//api/hints").then((function(e){e.data&&e.data.forEach((function(e){e.level===parseInt(t[2],10)&&n.push({title:"Hint "+e.index,description:e.hint})}))})),this.setState({hints:n}),N.a.get("https://cryptex.elan.org.in//api/leaderboard").then((function(t){if(null!=t.data){for(var n=e.state.leaderboard.length,r=0;r<n&&r<t.data.length;r++)a[r].lastName=t.data[r].username,a[r].age=t.data[r].level;N.a.get("https://cryptex.elan.org.in//api/username?email="+JSON.parse(localStorage.getItem("email")).email).then((function(a){if(a.data.username){for(var n=-1,r=0;r<e.state.leaderboard.length;r++)e.state.leaderboard[r].lastName===a.data.username&&(n=r);if(n<0){var l=-1;for(r=0;r<t.data.length;r++)t.data[r].username===a.data.username&&(l=r);if(l>=0){var o=-1;for(r=0;r<t.data.length;r++)if(t.data[l].level===t.data[r].level){o=r;break}var i,c=-1;for(r=0;r<e.state.leaderboard.length;r++)e.state.leaderboard[r].lastName===t.data[o].username&&(c=r);if(c<0)(i=e.state.leaderboard)[4].lastName=t.data[o].username,i[4].age=t.data[o].level,i[4].firstName=o+1;if(o==l)e.state.leaderboard.push();else(i=e.state.leaderboard)[5].lastName=t.data[l].username,i[5].age=t.data[l].level,i[5].firstName=l+1}}}}))}})),this.setState({loadingTable:!1}),this.setState({leaderboard:a}),setInterval((function(){var a=[];N.a.get("https://cryptex.elan.org.in//api/hints").then((function(n){console.log(n),n.data&&n.data.forEach((function(n){n.level===parseInt(t[2],10)&&a.push({title:"Hint "+n.index,description:n.hint}),e.setState({hints:a})}))})),e.setState({loadingTable:!0});var n=e.state.leaderboard;N.a.get("https://cryptex.elan.org.in//api/leaderboard").then((function(t){if(null!=t.data){for(var a=e.state.leaderboard.length,r=0;r<a&&r<t.data.length;r++)n[r].lastName=t.data[r].username,n[r].age=t.data[r].level;N.a.get("https://cryptex.elan.org.in//api/username?email="+JSON.parse(localStorage.getItem("email")).email).then((function(a){if(a.data.username){for(var n=-1,r=0;r<e.state.leaderboard.length;r++)e.state.leaderboard[r].lastName===a.data.username&&(n=r);if(n<0){var l=-1;for(r=0;r<t.data.length;r++)t.data[r].username===a.data.username&&(l=r);if(l>=0){var o=-1;for(r=0;r<t.data.length;r++)if(t.data[l].level===t.data[r].level){o=r;break}var i,c=-1;for(r=0;r<e.state.leaderboard.length;r++)e.state.leaderboard[r].lastName===t.data[o].username&&(c=r);if(c<0)(i=e.state.leaderboard)[4].lastName=t.data[o].username,i[4].age=t.data[o].level,i[4].firstName=o+1;if(o==l)e.state.leaderboard.push();else(i=e.state.leaderboard)[5].lastName=t.data[l].username,i[5].age=t.data[l].level,i[5].firstName=l+1}}}}))}})),e.setState({loadingTable:!1}),e.setState({leaderboard:n})}),3e3)}}},{key:"render",value:function(){var e=[];console.log(e);for(var t=0;t<=this.state.maxLevel;t++)e.push(r.a.createElement(S.a.Item,null,r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"/level/"+t},"Level ",t)));return r.a.createElement("div",{style:{height:"100vh",backgroundColor:"rgba(30, 41, 57, 0.7)"}},r.a.createElement(W,null),r.a.createElement(k.a,{style:{paddingTop:"3vh",marginLeft:"auto",marginRight:"auto",textAlign:"center"}},r.a.createElement(I.Slide,{left:!0},r.a.createElement(x.a,{span:5,style:{paddingTop:"20px",paddingRight:"20px",boxShadow:"4px 16px 16px 4px rgba(0,0,0,0.2)",height:"100vh",backgroundColor:"rgb(30, 41, 57)"},className:"hiddenOnMobile"},r.a.createElement(O.a,{defaultActiveKey:["1"],className:"acc",style:{borderRadius:"0px",marginLeft:"20px",marginBottom:"20px"},onChange:Y,expandIcon:function(e){var t=e.isActive;return r.a.createElement(w.a,{type:"caret-down",rotate:t?180:0,style:{color:"#24C4A3"}})}},r.a.createElement(J,{className:" acc one",header:"LEADERBOARD",key:"1",style:K},r.a.createElement("a",{href:"/leaderboard",target:"_blank"},r.a.createElement(C.a,{className:"borders",dataSource:this.state.leaderboard,pagination:!1,loading:this.state.loadingTable},r.a.createElement(U,{className:"colm",ellipsis:!0,title:"Rank",dataIndex:"firstName",key:"firstName",align:"center"}),r.a.createElement(U,{className:"colm",ellipsis:!0,title:"Username",dataIndex:"lastName",key:"lastName",align:"center"}),r.a.createElement(U,{className:"colm",ellipsis:!0,title:"Level",dataIndex:"age",key:"age",align:"center"})),r.a.createElement("div",{style:{textAlign:"center",paddingTop:"5px"}},r.a.createElement("a",{href:"/leaderboard",target:"_blank",style:{color:"#24C4A3",marginLeft:"auto",marginRight:"auto"}},"View More"))))),r.a.createElement(O.a,{defaultActiveKey:["2"],className:"acc",style:{borderRadius:"0px",marginLeft:"20px"},onChange:Y,expandIcon:function(e){var t=e.isActive;return r.a.createElement(w.a,{type:"caret-down",rotate:t?180:0,style:{color:"#24C4A3"}})}},r.a.createElement(J,{className:"acc two",header:"COUNTDOWN",key:"2",style:Q},r.a.createElement("p",{className:"borders",style:{backgroundColor:"#1E2939",textAlign:"center",color:"#cff8fa"}},r.a.createElement(k.a,{style:{paddingTop:"1vw",paddingBottom:"1vw"}},r.a.createElement(x.a,{span:8},r.a.createElement("p",{style:{fontSize:"1.3vw"}},this.state.hoursDifference),r.a.createElement("p",{style:{fontSize:".7vw"}},"HOURS")),r.a.createElement(x.a,{span:8},r.a.createElement("p",{style:{fontSize:"1.3vw"}},this.state.minutesDifference),r.a.createElement("p",{style:{fontSize:".7vw"}},"MINUTES")),r.a.createElement(x.a,{span:8},r.a.createElement("p",{style:{fontSize:"1.3vw"}},this.state.secondsDifference),r.a.createElement("p",{style:{fontSize:".7vw"}},"SECONDS")))))))),r.a.createElement(I.Fade,{top:!0},r.a.createElement(x.a,{span:window.innerWidth<=480?24:14,style:{height:"80vh",textAlign:"center",marginLeft:"auto",marginRight:"auto"}},r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement(E.a,{overlay:r.a.createElement(S.a,null,e)},r.a.createElement("a",{className:"ant-dropdown-link",href:"#",style:{color:"white",fontSize:"1.1rem",padding:"15px",border:"1px solid #24C4A3"}},"Choose level"," ",r.a.createElement(w.a,{type:"down",style:{color:"#24C4A3",paddingLeft:"5px"}})))),r.a.createElement(G,{level:this.state.level}),r.a.createElement("div",{style:{paddingTop:"20px"}},r.a.createElement("a",{href:"#",style:{color:"#24C4A3",fontSize:"1rem"},onClick:function(){localStorage.clear(),window.location.replace("https://elan.org.in/cryptex")}},"Logout")))),r.a.createElement(I.Slide,{right:!0},r.a.createElement(x.a,{span:5,style:{paddingTop:"20px",paddingLeft:"20px",boxShadow:"4px 16px 16px 4px rgba(0,0,0,0.2)",height:"60vw",backgroundColor:"rgb(30, 41, 57)"},className:"hiddenOnMobile"},r.a.createElement(O.a,{defaultActiveKey:["1"],className:"acc",style:{marginRight:"20px"},onChange:Z,expandIcon:function(e){var t=e.isActive;return r.a.createElement(w.a,{type:"caret-down",rotate:t?180:0,style:{color:"#24C4A3"}})}},r.a.createElement(J,{className:"acc three",header:"HINTS",key:"1",style:V},r.a.createElement(y.a,{className:"borders hints",itemLayout:"horizontal",dataSource:this.state.hints,renderItem:function(e){return r.a.createElement(y.a.Item,{className:"lists"},r.a.createElement(y.a.Item.Meta,{className:"lists",avatar:r.a.createElement(w.a,{style:{color:"#24C4A3",fontSize:"1.5vw"},type:"sketch"}),title:e.title,description:e.description}))}}),r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement("a",{href:"https://forum.elan.org.in",target:"_blank",style:{color:"#24C4A3",marginLeft:"auto",marginRight:"auto"}},"View Forum"))))))))}}]),t}(r.a.Component),X=(a(439),R.a.Title),ee=[{title:"Rank",dataIndex:"rank",key:"rank"},{title:"Username",dataIndex:"username",key:"username"},{title:"Level",dataIndex:"level",key:"level"}],te=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).state={isLoading:!0,dataSource:[]},e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;N.a.get("https://cryptex.elan.org.in/api/leaderboard").then((function(t){var a=e.state.dataSource;t.data.map((function(e,t){a.push({key:t+1,rank:t+1,username:e.username,level:e.level})})),e.setState({dataSource:a,isLoading:!1})}))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(W,null),r.a.createElement(I.Fade,null,r.a.createElement("div",{className:"container"},r.a.createElement(X,{level:1,className:"main-title"},"Leaderboard"),r.a.createElement(C.a,{pagination:{defaultPageSize:500,position:"top"},columns:ee,dataSource:this.state.dataSource,style:{paddingLeft:"1vh",paddingRight:"1vh"},loading:this.state.isLoading}))))}}]),t}(r.a.Component),ae=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){window.location.replace("https://elan.org.in/cryptex")}},{key:"render",value:function(){return r.a.createElement("div",null)}}]),t}(r.a.Component),ne=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return window.location.href.length<100?localStorage.getItem("id_token")?r.a.createElement(m.a,null,r.a.createElement(h.c,null,r.a.createElement(h.a,{path:"/leaderboard"},r.a.createElement(te,null)),r.a.createElement(h.a,{path:"/"},r.a.createElement($,null)))):r.a.createElement(m.a,null,r.a.createElement(h.c,null,r.a.createElement(h.a,{path:"/leaderboard"},r.a.createElement(te,null)),r.a.createElement(h.a,{path:"/level"},r.a.createElement($,null)),r.a.createElement(h.a,{path:"/portal"},r.a.createElement(v,null)),r.a.createElement(h.a,{path:"/"},r.a.createElement(ae,null)))):r.a.createElement(v,null)}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(ne,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[215,1,2]]]);
//# sourceMappingURL=main.89aff93b.chunk.js.map