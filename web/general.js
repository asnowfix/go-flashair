var flashair = {
	scroll_info : new Array(),
	now_pos : 0,
	now_disp_mode : "default_disp",
	RELOADTIME : 2000,
	NAVITIME : 200,
	SLIDESHOWTIME : 15000,
	SLIDESHOWBARNICK : 5,
	SLIDESHOWBARBLOCK : 60,
	SLIDESHOWBARTIME : 15000/5,
	SLIDESHOWNEXT : 1000,
	CIPATH_DISP_LENGTH : 32,
	lang_info : "",
	RetryCount : 0,
	Parent : "",
	chg_size_b_left_pos : 0,
	cipath_cut : "",
	
	Get_Browser : function(){
		var ua = window.navigator.userAgent.toLowerCase();
		var ver = window.navigator.appVersion.toLowerCase();
		
		if( ua.indexOf("msie") > -1 ){
			var msie=navigator.appVersion.toLowerCase();
			msie=(msie.indexOf('msie')>-1)?parseInt(msie.replace(/.*msie[ ]/,'').match(/^[0-9]+/)):0;
			
			if( ver.indexOf("msie 6.0") > -1 ){
				browser = "IE6";
			}
			else if( ver.indexOf("msie 7.0") > -1 ){
				browser = "IE7";
			}
			else if( ver.indexOf("msie 8.0") > -1 ){
				browser = "IE8";
			}
			else{
				browser = "IE";
			}
		}
		else if( ua.indexOf("firefox") > -1 ){
			browser = "Firefox";
		}
		else if( ua.indexOf("chrome") > -1 ){
			browser = "GoogleChrome";
		}
		else if( ua.indexOf("opera") > -1 ){
			browser = "Opera";
		}
		else if( ua.indexOf("safari") > -1 ){
			browser = "Safari";
		}
		else{
			browser = "unknown";
		}
		return browser;
	},
	List_Info : function( list, set_no ){
		var b = list.split(",");
		var name = b[1];
		var ext  = new Array();
		ext = name.split(".");
		this.path = b[0];
		this.name = b[1];
		this.size = b[2];
		this.attr = b[3];
		this.date = b[4];
		this.time = b[5];
		this.no   = set_no;
		
		if( ext.length == 1 ){
			this.ext  = "";
		}
		else{
			this.ext = ext[ext.length-1];
		}
		
		if( this.path == "/" ){
			this.href = "/" + encodeURIComponent(name);
			this.id   = "/" + encodeURI(name);
		}
		else{
			this.href = b[0] + "/" + encodeURIComponent(name);
			this.id   = b[0] + "/" + encodeURI(name);
		}
		
		if( !( b[3] & 0x10 ) ){
			if( ( this.ext == "JPG" ) || ( this.ext == "jpg" ) || ( this.ext == "jpeg" ) ){
				this.icon = "/thumbnail.cgi?" + this.href;
			}
			else{
				var ext_lc = this.ext.toLowerCase();
				
				if( ( ext_lc == "mov" ) || ( ext_lc == "avi" ) || ( ext_lc == "mpg" ) || ( ext_lc == "mpeg" ) || ( ext_lc == "mp4" ) || ( ext_lc == "wmv" ) || ( ext_lc == "rm" ) ){
					this.icon = "/~/movie.png";
				}
				else if( ( ext_lc == "mp3" ) || ( ext_lc == "wma" ) || ( ext_lc == "aac" ) || ( ext_lc == "wav" ) || ( ext_lc == "aiff" ) ){
					this.icon = "/~/song.png";
				}
				else if( ( ext_lc == "gif" ) || ( ext_lc == "bmp" ) || ( ext_lc == "png" ) || ( ext_lc == "jpg" ) || ( ext_lc == "jpeg" ) ){
					this.icon = "/~/photo.png";
				}
				else if( ext_lc == "txt" ){
					this.icon = "/~/text.png";
				}
				else{
					this.icon = "/~/other.png";
				}
			}
		}
		else{
			if( ( this.name == "DCIM" ) && ( this.path == "" ) ){
				this.icon = "/~/dcim.png";
			}
			else{
				this.icon = "/~/folder.png";
			
			}
		}
	},
	Link_Root : function(){
		if( document.getElementById("back_b").style.display != "none" ){
			location.href = "/";
		}
	},
	Link_Root_Force : function(){
		location.href = "/";
	},
	Link_Set : function(){
		location.href = "/~/Set.htm";
	},
	Back_Folder : function(){
		var i;
		var st = "";
		
		var addr = now_href.split("/");
		
		if( addr[addr.length-1] == "" ){
			for( i =0; i<(addr.length - 2); i++ ){
				st += addr[i] + "/"
			}
		}
		else{
			for( i =0; i<(addr.length - 1); i++ ){
				st += addr[i] + "/"
			}
		}
		
		location.href = st;
	},
	Stop_Wlan : function(){
		ret = confirm( flashair.Set_Lang("Set_StopWlan_Lang_1") );
		if( ret == true ){
			var dd = new Date();
			httpObj = new XMLHttpRequest();
			httpObj.open( "GET", '/command.cgi?op=112'+'&TIME='+dd.getTime(), false );
			httpObj.send(null);
			if( httpObj.responseText == 'SUCCESS'){
				alert( flashair.Set_Lang("Set_StopWlan_Lang_2") );
			}
		}
	},
	Tab_UP : function( tab_no ){
		
		flashair.now_pos = tab_no;
		
		setTimeout( "flashair.Link_Tab_UP()", 200 );
	},
	Tab_Down : function( tab_no ){
		
		flashair.now_pos = tab_no;
		
		setTimeout( "flashair.Link_Tab_Down()", 200 );
	},
	Link_Tab_UP : function(){
		if( location.pathname == "/~/phtshare.htm" ){
			if( flashair.now_pos == 0 ){
				flashair.now_pos = 0;
				tab = "top";
			}
			else{
				flashair.now_pos = flashair.now_pos -1 ;
				tab = "tab"+flashair.now_pos;
			}
		}
		else if( location.pathname == "/~/stpicpth.htm" ){
			if( flashair.now_pos == 0 ){
				flashair.now_pos = 0;
				tab = "top";
			}
			else{
				flashair.now_pos = flashair.now_pos -1 ;
				tab = "tab"+flashair.now_pos;
			}
		}
		else{
			tab = "top";
			for( i = 0 ; i < LIST.length ; i ++ ){
				if( LIST[i].date == flashair.now_pos ){
					if( i == 0 ){
						flashair.now_pos = LIST[i].date;
					}
					else{
						flashair.now_pos = LIST[i-1].date;
						tab = "tab"+flashair.now_pos;
					}
					break;
				}
			}
		}
		
		flashair.Scroll_LinkJump( tab );
	},
	Link_Tab_Down : function(){
		var flag = 0;
		if( location.pathname == "/~/phtshare.htm" ){
			if( flashair.now_pos != share_count - 2 ){
				flashair.now_pos = flashair.now_pos + 1;
			}
			else{
				flashair.now_pos = share_count - 2;
			}
		}
		else if( location.pathname == "/~/stpicpth.htm" ){
			if( flashair.now_pos < tab_cnt - 1 ){
				flashair.now_pos = flashair.now_pos + 1;
			}
		}
		else{
			for( i = 0 ; i < LIST.length ; i ++ ){
				if( ( LIST[i].date == flashair.now_pos ) && ( flag == 0 ) ){
					flag = 1;
				}
				else if( ( flag == 1 ) && ( LIST[i].date != flashair.now_pos ) ){
					flashair.now_pos = LIST[i].date;
					break;
				}
			}
		}
		
		flashair.Scroll_LinkJump( "tab"+flashair.now_pos );
	},
	Scroll_LinkJump : function( link_ID ){
		flashair.scroll_info.scroll_ratio= 10;
		var scroll_speed = 10;
		
		if( flashair.scroll_info.timerId ){
			clearInterval( flashair.scroll_info.timerId );
		}
		
		flashair.scroll_info.top_pos = document.documentElement.scrollTop|document.body.scrollTop;
		flashair.scroll_info.left_pos = document.documentElement.scrollLeft|document.body.scrollLeft;
		
		if( link_ID == "top" ){
			flashair.scroll_info.target_pos = 0;
		}
		else{
			var obj = document.getElementById( link_ID );
			
			if( !obj || ( obj && !obj.offsetTop ) ){
				return;
			}
			
			flashair.scroll_info.target_pos = obj.offsetTop;
		}
		
		flashair.scroll_info.udFlag = !!( flashair.scroll_info.target_pos < flashair.scroll_info.top_pos );
		
		if( flashair.scroll_info.udFlag ){
			flashair.scroll_info.pos_diff = flashair.scroll_info.top_pos - flashair.scroll_info.target_pos;
		}
		else{
			flashair.scroll_info.pos_diff = flashair.scroll_info.target_pos - flashair.scroll_info.top_pos;
		}
		flashair.scroll_info.timerId = setInterval( "flashair.Scroll()", scroll_speed );
	},
	
	Scroll : function(){
		var endFlag=0;
		if( !flashair.scroll_info.udFlag ){
			flashair.scroll_info.top_pos += Math.ceil( flashair.scroll_info.pos_diff * ( flashair.scroll_info.scroll_ratio/100 ) );
			
			if( flashair.scroll_info.target_pos <= flashair.scroll_info.top_pos ){
				endFlag = 1;
			}
		}
		else{
			flashair.scroll_info.top_pos -= Math.ceil( flashair.scroll_info.pos_diff * ( flashair.scroll_info.scroll_ratio/100 ) );
			
			if( flashair.scroll_info.target_pos >= flashair.scroll_info.top_pos ){
				endFlag = 1;
			}
		}
		
		if( endFlag ){
			flashair.scroll_info.top_pos = flashair.scroll_info.target_pos;
			flashair.scroll_info.timerId = clearInterval( flashair.scroll_info.timerId );
		}
		
		window.scrollTo( flashair.scroll_info.left_pos, flashair.scroll_info.top_pos );
	},
	LoadImgsEnd : function(){
		if( box_type == "box_list" ){
			document.getElementById("thumbnail").style.marginLeft = "0px";
			document.getElementById("thumbnail").style.marginRight = "0px";
		}
		else{
			document.getElementById("thumbnail").style.marginLeft = "8px";
			document.getElementById("thumbnail").style.marginRight = "8px";
		}
		
		reload_timer = window.setTimeout( "flashair.Reload_File()", flashair.RELOADTIME );
	},
	Load_Imgs : function(){
		clearTimeout( reload_timer );
		
		if( LIST.length == 0 ){
			flashair.LoadImgsEnd();
			return;
		}
		
		var box = document.images[("n" + cnt)];
		if( ( box.src.indexOf( LIST[cnt].icon, 0 ) != -1 ) && ( flashair.RetryCount == 0 ) ){
			cnt ++;
			
			if( cnt < LIST.length ){
				flashair.Load_Imgs();
			}
			else if( cnt == LIST.length ){
				flashair.LoadImgsEnd();
			}
			else{
				
			}
		}
		else{
			box.onload = function(){
				if( this.width > 30 ){
					if( ( this.width == 120 ) && ( this.height == 160 ) ){
						this.width = this.width * (3.0/8.0);
						this.height = this.height * (3.0/8.0);
						this.style.marginLeft = "18px";
						this.style.marginRight = "17px";
					}
				}
				
//				this.className = "thumb_img_tile_touch";
				flashair.RetryCount = 0;
				cnt ++;
				
				if( cnt < LIST.length ){
					flashair.Load_Imgs();
				}
				else if( cnt == LIST.length ){
					flashair.LoadImgsEnd();
				}
				else{
					
				}
			};
			box.onerror = function(){
				if( ( now_b == "IE" ) || ( now_b == "IE8" ) || ( now_b == "IE7" ) || ( now_b == "IE6" ) ){
					this.src  = "/~/photo.png";
				}
				else{
					if( flashair.RetryCount < 3 ){
						flashair.RetryCount ++;
						setTimeout( "flashair.Load_Imgs()", 200 );
					}
					else{
						this.src = "/~/photo.png";
					}
				}
			};
			
			box.src = LIST[cnt].icon;
		}
	},
	Act_Tab : function( date ){
		var tab = document.getElementById("tab"+date);
		var til = document.getElementById("til"+date);
		
		if( til.style.display == "none" ){
			document.getElementById("tab_oc" + date).className = "tab_close_b";
			
			til.style.display = "block";
			tab.className = "tab";
		}
		else{
			document.getElementById("tab_oc" + date).className = "tab_open_b";
			
			til.style.display = "none";
			tab.className = "tab_sel";
		}
	},
	Make_List : function(){
		var i;
		var bw = document.documentElement.clientWidth;
		var td_date_w = bw - 90;
		var td_button_w = 30;
		var predate = "";
		var thumbnail = document.getElementById("thumbnail");
		var st = "";
		var box_img = "";
		var box_br = "";
		var box_main = "";
		var box_main_w = "0px";
		var box_td1_align;
		
		if( LIST.length == 0 ){
			return;
		}
		
		for( i = 0 ; i < LIST.length ; i ++ ){
			if( ( tab_mode ) && ( LIST[i].date != predate ) ){
				if( predate != "" ){
					st += '</div></div>';
				}
				else{
					flashair.now_pos = LIST[i].date;
				}
				
				y = ((LIST[i].date & 0xfe00) >> 9) + 1980;
				m = (LIST[i].date & 0x1e0) >> 5;
				d = LIST[i].date & 0x1f;
				
				st += "<div id='dmy"+LIST[i].date+"' class='dummy_tab'>";
				st += "<table border='0' cellspacing='0' cellpadding='0' id='tab"+LIST[i].date+"' class='tab'>";
				st += "<tr align='center'>";
				st += "<td id='tab_data_1' align='left' width='"+td_button_w+"' onclick='flashair.Act_Tab("+LIST[i].date+")'>";
				st += "<div id='tab_oc"+LIST[i].date+"' class='tab_close_b'></div>";
				st += "</td>";
				st += "<td id='tab_data_2' align='left' width='"+td_date_w+"' onclick='flashair.Act_Tab("+LIST[i].date+")'>";
				st += y+'/'+m+'/'+d;
				st += "</td>";
				if( now_share_mode != "SHAREMODE" ){
					st += "<td id='tab_data_3' align='center' width='"+td_button_w+"'>";
					st += "<div id='tab_j_u"+LIST[i].date+"' class='tab_up_b' onclick='flashair.Tab_UP("+LIST[i].date+")'></div>";
					st += "</td>";
					st += "<td id='tab_data_4' align='center' width='"+td_button_w+"'>";
					st += "<div id='tab_j_d"+LIST[i].date+"' class='tab_down_b' onclick='flashair.Tab_Down("+LIST[i].date+")'></div>";
					st += "</td>";
				}
				else{
					st += "<td id='tab_data_3' align='center' width='0'>";
					st += "</td>";
					st += "<td id='tab_data_4' align='center' width='0'>";
					st += "</td>";
				}
				st += "</tr>";
				st += "</table>";
				st += "<div id='til"+LIST[i].date+"' class='tile'>";
			}
			
			predate = LIST[i].date;
			
			box_type = sessionStorage.getItem("box_type");
			
			if( box_type == "box_list" ){
				box_main = "box_main_list";
				box_img = "thumb_img_list";
				box_br = "br_list";
				
				var bw = document.documentElement.clientWidth;
				
				box_main_w = (bw-80) + "px";
				
				box_td1_align = "left";
				
			}
			else if( box_type == "box_tile" ){
				box_main = "box_main_tile";
				box_img = "thumb_img_tile";
				box_br = "br_tile";
				
				box_main_w = "80px";
				
				box_td1_align = "center";
			}
			else{
				box_type = "box_tile";
				box_main = "box_main_tile";
				box_img = "thumb_img_tile";
				box_br = "br_tile";
				sessionStorage.setItem("box_type", "box_tile");
				
				box_main_w = "80px";
				
				box_td1_align = "center";
			}
			
			if( !( LIST[i].attr & 0x10 ) ){
				var ext_lc = LIST[i].ext.toLowerCase();
				
				if( ( ext_lc == "jpg" ) || ( ext_lc == "jpeg" ) ){
					st += '<div id="box'+LIST[i].no+'" class="'+box_type+'">';
					st += '<table border="0" cellspacing="0" cellpadding="0" width="100%"><tr>';
					st += '<td id="box_td1'+LIST[i].no+'" align="'+box_td1_align+'" onclick="flashair.Zoom_Img('+LIST[i].no+')">';
					st += '<div id="box_main'+LIST[i].no+'" class="'+box_main+'" style="width:'+box_main_w+'">';
					st += '<img id="box_img'+LIST[i].no+'" src="/~/photo.png" width="80" height="60" name="n'+LIST[i].no+'" class="'+box_img+'"><br id="box_br'+LIST[i].no+'" class="'+box_br+'">'+LIST[i].name+'</div></td>';
					st += '<td align="right" onclick="flashair.Disp_Box_Info('+LIST[i].no+')" width="80px">';
					st += '<div id="box_info'+LIST[i].no+'" class="box_info"></div>';
					st += '</td></tr></table>';
					st += '</div>';
				}
				else{
					st += '<div id="box'+LIST[i].no+'" class="'+box_type+'">';
					st += '<table border="0" cellspacing="0" cellpadding="0" width="100%"><tr>';
					st += '<td id="box_td1'+LIST[i].no+'" align="'+box_td1_align+'"><a href="'+LIST[i].href+'">';
					st += '<div id="box_main'+LIST[i].no+'" class="'+box_main+'" style="width:'+box_main_w+'">';
					st += '<img id="box_img'+LIST[i].no+'" src="/~/other.png" width="80" height="60" name="n'+LIST[i].no+'" class="'+box_img+'"><br id="box_br'+LIST[i].no+'" class="'+box_br+'">'+LIST[i].name+'</div></a></td>';
					st += '<td align="right" onclick="flashair.Disp_Box_Info('+LIST[i].no+')" width="80px">';
					st += '<div id="box_info'+LIST[i].no+'" class="box_info"></div>';
					st += '</td></tr></table>';
					st += '</div>';
				}
			}
			else{
				if(  ( LIST[i].name == "DCIM" ) && ( LIST[i].path == "" ) ){
					st += '<div id="box'+LIST[i].no+'" class="'+box_type+'">';
					st += '<table border="0" cellspacing="0" cellpadding="0" width="100%"><tr>';
					st += '<td id="box_td1'+LIST[i].no+'" align="'+box_td1_align+'" onclick="flashair.Link_List('+LIST[i].no+')">';
					st += '<div id="box_main'+LIST[i].no+'" class="'+box_main+'" style="width:'+box_main_w+'">';
					st += '<img id="box_img'+LIST[i].no+'" src="/~/dcim.png" width="80" height="60" name="n'+LIST[i].no+'" class="'+box_img+'"><br id="box_br'+LIST[i].no+'" class="'+box_br+'">'+LIST[i].name+'</div></td>';
					st += '<td align="right" onclick="flashair.Disp_Box_Info('+LIST[i].no+')" width="80px">';
					st += '<div id="box_info'+LIST[i].no+'" class="box_info"></div>';
					st += '</td></tr></table>';
					st += '</div>';
				}
				else{
					st += '<div id="box'+LIST[i].no+'" class="'+box_type+'">';
					st += '<table border="0" cellspacing="0" cellpadding="0" width="100%"><tr>';
					st += '<td id="box_td1'+LIST[i].no+'" align="'+box_td1_align+'" onclick="flashair.Link_List('+LIST[i].no+')">';
					st += '<div id="box_main'+LIST[i].no+'" class="'+box_main+'" style="width:'+box_main_w+'">';
					st += '<img id="box_img'+LIST[i].no+'" src="/~/folder.png" width="80" height="60" name="n'+LIST[i].no+'" class="'+box_img+'"><br id="box_br'+LIST[i].no+'"r class="'+box_br+'">'+LIST[i].name+'</div></td>';
					st += '<td align="right" onclick="flashair.Disp_Box_Info('+LIST[i].no+')" width="80px">';
					st += '<div id="box_info'+LIST[i].no+'" class="box_info"></div>';
					st += '</td></tr></table>';
					st += '</div>';
				}
			}
		}
		
		if( tab_mode == 1 ){
			st += '</div></div>';
		}
		
		thumbnail.innerHTML = st;
		
		for( i = 0 ; i < LIST.length ; i ++ ){
			if( box_type == "box_list" ){
				document.getElementById("box_info"+LIST[i].no).style.display = "block";
			}
			else{
				document.getElementById("box_info"+LIST[i].no).style.display = "none";
			}
		}
	},
	Link_List : function( org_no ){
		var i;
		var list_no;
		
		for( i = 0 ; i < LIST.length ; i ++ ){
			if( org_no == LIST[i].no ){
				list_no = i;
				location.href = LIST[list_no].href;
				break;
			}
		}
	},
	Disp_Box_Info : function( org_no ){
		var i;
		var list_no;
		var name;
		var date,y,m,d;
		var time,t_h,t_m;
		var date_time;
		var size;
		var st;
		
		for( i = 0 ; i < LIST.length ; i ++ ){
			if( org_no == LIST[i].no ){
				list_no = i;
				break;
			}
		}
		
		if( !( LIST[list_no].attr & 0x10 ) ){
			name = flashair.Set_Lang("Set_List_Lang_11") + " " + LIST[list_no].name + "\n";
		}
		else{
			name = flashair.Set_Lang("Set_List_Lang_16") + " " + LIST[list_no].name + "\n";
		}
		
		d_y = ((LIST[list_no].date & 0xfe00) >> 9) + 1980;
		
		d_m = (LIST[list_no].date & 0x1e0) >> 5;
		if( d_m < 10 ){
			d_m = "0" + d_m;
		}
		
		d_d = LIST[list_no].date & 0x1f;
		if( d_d < 10 ){
			d_d = "0" + d_d;
		}
		
		date = d_y + "/" + d_m + "/" + d_d;
		
		t_h = (LIST[list_no].time & 0xf800) >> 11;
		if( t_h < 10 ){
			t_h = "0" + t_h;
		}
		
		t_m = (LIST[list_no].time & 0x7e0) >> 5;
		if( t_m < 10 ){
			t_m = "0" + t_m;
		}
		
		time = t_h + ":" + t_m;
		
		if( !( LIST[list_no].attr & 0x10 ) ){
			var ext_lc = LIST[i].ext.toLowerCase();
			
			if( ( ext_lc == "jpg" ) || ( ext_lc == "jpeg" ) ){
				date_time = flashair.Set_Lang("Set_List_Lang_12") + " " + date + " " + time + "\n";
			}
			else{
				date_time = flashair.Set_Lang("Set_List_Lang_13") + " " + date + " " + time + "\n";
			}
			
			size = flashair.Set_Lang("Set_List_Lang_14") + " " + LIST[list_no].size + flashair.Set_Lang("Set_List_Lang_15");
			
			st = flashair.Set_Lang("Set_List_Lang_10") + name + date_time + size;
			alert( st );
		}
		else{
			date_time = flashair.Set_Lang("Set_List_Lang_13") + " " + date + " " + time + "\n";
			
			st = flashair.Set_Lang("Set_List_Lang_10") + name + date_time;
			alert( st );
		}
	},
	Change_Box_Disply : function(){
		var i;
		var box_br = "";
		var box_main_w = "0px";
		var box_td1_align;
		
		box_type = sessionStorage.getItem("box_type");
		
		if( box_type == "box_list" ){
			box_type = "box_tile";
			document.getElementById("box_change_b").className = "box_change_l_b";
			
			box_main_w = "80px";
			
			box_td1_align = "center";
			
			document.getElementById("thumbnail").style.marginLeft = "8px";
			document.getElementById("thumbnail").style.marginRight = "8px";
		}
		else{
			box_type = "box_list";
			document.getElementById("box_change_b").className = "box_change_t_b";
			
			var bw = document.documentElement.clientWidth;
			
			box_main_w = (bw-80) + "px";
			
			box_td1_align = "left";
			
			document.getElementById("thumbnail").style.marginLeft = "0px";
			document.getElementById("thumbnail").style.marginRight = "0px";
		}
		
		sessionStorage.setItem("box_type", box_type);
		
		for( i = 0 ; i < LIST.length ; i ++ ){
			var box_e = document.getElementById("box"+LIST[i].no);
			var box_td1_e = document.getElementById("box_td1"+LIST[i].no);
			var box_main_e = document.getElementById("box_main"+LIST[i].no);
			var box_img_e = document.getElementById("box_img"+LIST[i].no);
			var box_br_e = document.getElementById("box_br"+LIST[i].no);
			var box_info_e = document.getElementById("box_info"+LIST[i].no);
			
			if( box_e.className == "box_list" ){
				box_e.className = "box_tile";
				box_main_e.className = "box_main_tile";
				box_main_e.style.width = box_main_w;
				box_td1_e.align = box_td1_align;
				box_img_e.className = "thumb_img_tile";
				box_br_e.className = "br_tile";
				box_info_e.style.display = "none";
			}
			else if( box_e.className == "box_list_sel" ){
				box_e.className = "box_tile_sel";
				box_main_e.className = "box_main_tile";
				box_main_e.style.width = box_main_w;
				box_td1_e.align = box_td1_align;
				box_img_e.className = "thumb_img_tile";
				box_br_e.className = "br_tile";
				box_info_e.style.display = "none";
			}
			else if( box_e.className == "box_tile" ){
				box_e.className = "box_list";
				box_main_e.className = "box_main_list";
				box_main_e.style.width = box_main_w;
				box_td1_e.align = box_td1_align;
				box_img_e.className = "thumb_img_list";
				box_br_e.className = "br_list";
				box_info_e.style.display = "block";
			}
			else if( box_e.className == "box_tile_sel" ){
				box_e.className = "box_list_sel";
				box_main_e.className = "box_main_list";
				box_main_e.style.width = box_main_w;
				box_td1_e.align = box_td1_align;
				box_img_e.className = "thumb_img_list";
				box_br_e.className = "br_list";
				box_info_e.style.display = "block";
			}
			else{
				
			}
		}
	},
	Zoom_Img : function( org_no ){
		var bw = document.documentElement.clientWidth;
		var i;
		var list_no;
		
		if(jpegcnt!=0)return;
		
		for( i = 0 ; i < LIST.length ; i ++ ){
			if( org_no == LIST[i].no ){
				list_no = i;
				break;
			}
		}
		
		clearTimeout( reload_timer );
		
		if( flashair.now_disp_mode != "default_disp" ){
			var disp_img = document.getElementById("disp_img");
			
			if( disp_img.childNodes.length > 0 ){
				var NodeList = disp_img.childNodes;
				var Node = NodeList[0];
				var disp_id = Node.id;
				var disp_id_chk = disp_id.split("image");
				document.getElementById("box"+LIST[disp_id_chk[1]].no).className = box_type;
			}
			else{
				
			}
		}
		
		document.getElementById("title_tb_1").innerHTML = '<div id="thumb_b" class="thumb_b" name="thumb_b" onclick="flashair.Return_Thumbnail()"></div>';
		document.getElementById("title_tb_1").style.width = "60px";
		
		var f_name = document.getElementById("f_name");
		f_name.className = "f_name_n";
		
		if( now_share_mode == 'SHAREMODE' ){
			document.getElementById("title_tb_2").innerHTML = "";
			document.getElementById("title_tb_2").style.width = "0px";
			
			if( m_mode == "ON" ){
				f_name.innerHTML = LIST[list_no].name;
				f_name.style.width = bw - 120 + "px";
				
				document.getElementById("title_tb_5").innerHTML = '<div id="img_wlanstop_b" class="img_wlanstop_b" name="img_wlanstop_b" onclick="flashair.Stop_Wlan()"></div>';
				document.getElementById("title_tb_5").style.width = "60px";
			}
			else{
				f_name.innerHTML = LIST[list_no].name;
				f_name.style.width = bw - 60 + "px";
				
				document.getElementById("title_tb_5").innerHTML = "";
				document.getElementById("title_tb_5").style.width = "0px";
			}
		}
		else{
			if( now_href == "/" ){
				document.getElementById("title_tb_2").innerHTML = "";
				document.getElementById("title_tb_2").style.width = "0px";
				
				if( m_mode == "ON" ){
					f_name.innerHTML = LIST[list_no].name;
					f_name.style.width = bw - 120 + "px";
					
					document.getElementById("title_tb_5").innerHTML = '<div id="img_wlanstop_b" class="img_wlanstop_b" name="img_wlanstop_b" onclick="flashair.Stop_Wlan()"></div>';
					document.getElementById("title_tb_5").style.width = "60px";
				}
				else{
					f_name.innerHTML = LIST[list_no].name;
					f_name.style.width = bw - 60 + "px";
					
					document.getElementById("title_tb_5").innerHTML = "";
					document.getElementById("title_tb_5").style.width = "0px";
				}
			}
			else{
				document.getElementById("title_tb_2").innerHTML = '<div class="faheader" onclick="flashair.Link_Root_Force()"></div>';
				document.getElementById("title_tb_2").style.width = "60px";
				
				if( m_mode == "ON" ){
					f_name.innerHTML = LIST[list_no].name;
					f_name.style.width = bw - 170 + "px";
					
					document.getElementById("title_tb_5").innerHTML = '<div id="img_wlanstop_b" class="img_wlanstop_b" name="img_wlanstop_b" onclick="flashair.Stop_Wlan()"></div>';
					document.getElementById("title_tb_5").style.width = "60px";
				}
				else{
					f_name.innerHTML = LIST[list_no].name;
					f_name.style.width = bw - 120 + "px";
					
					document.getElementById("title_tb_5").innerHTML = "";
					document.getElementById("title_tb_5").style.width = "0px";
				}
			}
		}
		
		document.getElementById("title_tb_4").innerHTML = "";
		document.getElementById("title_tb_4").style.width = "0px";
		
		document.body.className = "zoom_dsip";
		
		document.getElementById("thumbnail").style.display = "none";
		document.getElementById("subtitle").style.display = "none";
		document.getElementById("footer").style.display = "none";
		
		if( now_share_mode == "SHAREMODE" ){
			if(m_mode == "ON"){
				document.getElementById("brset").style.display = "none";
				document.getElementById("sharessid").style.display = "none";
				document.getElementById("sharepass").style.display = "none";
			}
		}
		
		flashair.Zoom_Img_Window( org_no, 1 );
	},
	SetNavigator_Window : function( org_no ){
		var bw = document.documentElement.clientWidth;
		var title = document.getElementById("title");
		var img_button = document.getElementById("img_button");
		var slideshowbar = document.getElementById("slideshowbar");
		var ssbar = document.getElementById("ssbar");
		
		if( img_button.childNodes.length == 0 ){
			var st = "";
			st += '<center><table border="0" cellspacing="0" cellpadding="0"><tr>';
			st += '<td><div id="chg_size_b" class="chg_size_a_b" name="chg_size_b" onclick="flashair.Change_Size('+org_no+')"></div></td>';
			st += '<td><div id="slide_show_b" class="slide_show_a_b" name="slide_show_b" onclick="flashair.Set_SlideShow()"></div></td>';
			st += '<td><div id="l_b" class="l_b" name="l_b" onclick="flashair.Left_Img()"></div></td>';
			st += '<td><div id="r_b" class="r_b" name="r_b" onclick="flashair.Right_Img('+1+')"></div></td>';
			st += '</tr></table></center>';
			img_button.innerHTML = st;
			img_button.style.textAlign = "center";
		}
		else{
			var chg_size_b = document.getElementById("chg_size_b");
			if( zoom_flag == "change_window_zoom" ){
				chg_size_b.className = "chg_size_a_b";
			}
			else{
				chg_size_b.className = "chg_size_w_b";
			}
			
			document.getElementById("chg_size_b").onclick = function(){
				flashair.Change_Size( org_no );
			};
		}
		
		title.style.position = "static";
		title.style.width = "";
		title.className = "title_nonfilter";
		
		img_button.style.position = "static";
		img_button.className = "img_button_nonfilter";
		
		slideshowbar.style.position = "static";
		
		if( ( slide_show_flag == "ON" ) && ( img_button.style.display == "none" ) ){
			img_button.style.display = "none";
		}
		else{
			img_button.style.display = "block";
		}
	},
	SetNavigator_Actual : function( org_no ){
		var bw = document.documentElement.clientWidth;
		var bh = document.documentElement.clientHeight;
		
		document.body.width = bw;
		
		var title = document.getElementById("title");
		title.style.top = "0px";
		title.style.left = "0px";
		title.style.width = bw + "px";
		title.style.position = "fixed";
		title.style.zIndex = "2";
		title.className = "title_filter";
		
		var img_button = document.getElementById("img_button");
		var NodeList = img_button.childNodes;
		img_button.style.top = ( title.offsetHeight ) + "px";
//		img_button.style.left = ( bw/2 - Math.floor(( NodeList[0].offsetWidth * NodeList.length )/2) ) + "px";
		img_button.style.left = "0px";
		img_button.style.position = "fixed";
		img_button.style.zIndex = "3";
		img_button.className = "img_button_filter";
		
		if( slide_show_flag == "ON" ){
			var slideshowbar = document.getElementById("slideshowbar");
			slideshowbar.style.top = ( bh - slideshowbar.offsetHeight ) + "px";
			slideshowbar.style.left = "0px";
		}
		
		var chg_size_b = document.getElementById("chg_size_b");
		if( zoom_flag == "change_window_zoom" ){
			chg_size_b.className = "chg_size_a_b";
		}
		else{
			chg_size_b.className = "chg_size_w_b";
		}
		
		document.getElementById("chg_size_b").onclick = function(){
			flashair.Change_Size( org_no );
		};
	},
	SetNavigator_Pos : function(){
		var bw = document.documentElement.clientWidth;
		var bh = document.documentElement.clientHeight;
		
		var title = document.getElementById("title");
		title.style.width = bw + "px";
		
		if( slide_show_flag == "ON" ){
			var slideshowbar = document.getElementById("slideshowbar");
			slideshowbar.style.top = ( bh - slideshowbar.offsetHeight ) + "px";
			
			document.getElementById("ssbar").style.width = (ss_bar_cnt * flashair.SLIDESHOWBARBLOCK) + "px";
		}
	},
	setNowJpgSrc : function( href ){
		var i;
		var now_jp_no;
		
		now_jpg_src = href;
		
		for( i = 0; i < jpg_cnt; i ++ ){
			if( now_jpg_src == jpg_src[i] ){
				now_jp_no = i;
				break;
			}
		}
		
		flashair.PreLoad( now_jp_no );
	},
	setThumbnailToDispArea : function( org_no ){
		var disp_img = document.getElementById("disp_img");
		
		if( disp_img.childNodes.length == 0 ){
			var nList = document.getElementsByName("n"+org_no);
			var w = nList[0].width;
			var h = nList[0].height;
			flashair.Parent = nList[0].parentNode;
			disp_img.appendChild(nList[0]);
			nList[0].width = w*2;
			nList[0].height = h*2;
			disp_img.style.display = "block";
			disp_img.style.zIndex = "1";
		}
	},
	changeDispArea : function( zoom_disp_io ){
		var disp_img = document.getElementById("disp_img");
		
		if( disp_img.childNodes.length > 0 ){
			var NodeList = disp_img.childNodes;
			var Node = NodeList[0];
			if( flashair.Parent != "" ){
				Node.width /= 2;
				Node.height /= 2;
				flashair.Parent.insertBefore(Node,flashair.Parent.firstChild);
				flashair.Parent = "";
			}
			else{
				disp_img.removeChild(Node);
			}
		}
		
		disp_img.appendChild(zoom_disp_io);
		disp_img.style.display = "block";
		disp_img.style.zIndex = "1";
	},
	Zoom_Img_Window : function( org_no, clear_flag ){
		clear_flag = Number(clear_flag);
		var j;
		var list_no;
		
		for( j = 0 ; j < LIST.length ; j ++ ){
			if( org_no == LIST[j].no ){
				list_no = j;
				break;
			}
		}
		
		var meta = document.getElementById("meta_id");
		meta.content = "width=device-width,initial-scale=1.0,user-scalable=yes";
		
//		window.scrollTo( 0, 0 );
		
		document.getElementById("f_name").innerHTML = LIST[list_no].name;
		
		if( zoom_flag != "change_window_zoom" ){
			var zoom_window_io = new Image();
			
			zoom_flag = "change_window_zoom";
			flashair.now_disp_mode = "window_disp";
			
			flashair.SetNavigator_Window( org_no );
			
			flashair.setThumbnailToDispArea( org_no );
			
			chg_size_b_left_pos = document.getElementById("chg_size_b").offsetLeft;
			
			zoom_window_io.id = "image"+list_no;
			zoom_window_io.name = "disp_img";
			zoom_window_io.className = "disp_img_real";
			
			zoom_window_io.onload = function(){
				if( flashair.now_disp_mode == "window_disp" ){
					zoom_flag = "window_zoom";
					var dispw, disph;
					{
						var ow, oh, bw, bh;
						ow = zoom_window_io.width;
						oh = zoom_window_io.height;
						bw = document.documentElement.clientWidth;
						bh = document.documentElement.clientHeight - document.getElementById("title").offsetHeight - document.getElementById("img_button").offsetHeight - 60;
						
						if( bh < bw ){
							dispw = bw;
							disph = Math.floor((bw*oh)/ow);
							
							if( disph > bh ){
								disph = bh;
								dispw = Math.floor((bh*ow)/oh);
							}
						}
						else{
							disph = bh;
							dispw = Math.floor((bh*ow)/oh);
							
							if( dispw > bw ){
								dispw = bw;
								disph = Math.floor((bw*oh)/ow);
							}
						}
					}
					if( dispw > zoom_window_io.width ){
						dispw = zoom_window_io.width;
						disph = zoom_window_io.height;
					}
					
					zoom_disp_w = dispw;
					zoom_disp_h = disph;
					zoom_window_io.width = dispw;
					zoom_window_io.height = disph;
					
					flashair.changeDispArea( zoom_window_io );
					
					flashair.setNowJpgSrc( LIST[list_no].href );
					
					if( slide_show_flag == "ON" ){
						ss_bar_cnt = 0;
						slide_show_timer = setTimeout( "flashair.Lengthen_Ss_Bar()", flashair.SLIDESHOWBARTIME );
					}
				}
				
				jpegcnt--;
			};
			
			zoom_window_io.src = LIST[list_no].href;
			jpegcnt++;
		}
	},
	Zoom_Img_Actual : function( org_no, clear_flag ){
		clear_flag = Number(clear_flag);
		var j;
		var list_no;
		
		for( j = 0 ; j < LIST.length ; j ++ ){
			if( org_no == LIST[j].no ){
				list_no = j;
				break;
			}
		}
		
		var meta = document.getElementById("meta_id");
		meta.content = "width=device-width,initial-scale=1.0,user-scalable=yes";
		
//		window.scrollTo( 0, 0 );
		
		document.body.width = document.documentElement.clientWidth;
		
		document.getElementById("f_name").innerHTML = LIST[list_no].name;
		
		if( zoom_flag != "change_actual_zoom" ){
			zoom_actual_io = new Image();
			
			zoom_flag = "change_actual_zoom";
			flashair.now_disp_mode = "actual_disp";
			
			zoom_actual_io.id = "image"+list_no;
			zoom_actual_io.name = "disp_img";
			
			flashair.SetNavigator_Actual( org_no );
			
			zoom_actual_io.onload = function()
			{
				if(flashair.now_disp_mode == "actual_disp"){
					zoom_flag = "actual_zoom";
					
					zoom_disp_w = zoom_actual_io.width;
					zoom_disp_h = zoom_actual_io.height;
					
					flashair.changeDispArea( zoom_actual_io );
					
					flashair.setNowJpgSrc( LIST[list_no].href );
					
					if( slide_show_flag == "ON" ){
						ss_bar_cnt = 0;
						slide_show_timer = setTimeout( "flashair.Lengthen_Ss_Bar()", flashair.SLIDESHOWBARTIME );
					}
					
					set_navi_actual_timer = window.setInterval( "flashair.SetNavigator_Pos()", flashair.NAVITIME );
				}
				
				jpegcnt--;
			};
			
			zoom_actual_io.src = LIST[list_no].href;
			jpegcnt++;
		}
	},
	Set_SlideShow : function(){
		if( slide_show_flag == "OFF" ){
			var bh = document.documentElement.clientHeight;
			
			slide_show_flag = "ON";
			document.getElementById("slide_show_b").className = "slide_show_m_b";
			
			var slideshowbar = document.getElementById("slideshowbar");
			slideshowbar.style.display = "block";
			
			if( flashair.now_disp_mode == "actual_disp" ){
				slideshowbar.style.top = ( bh - slideshowbar.offsetHeight ) + "px";
				slideshowbar.style.left = "0px";
				slideshowbar.style.position = "fixed";
				slideshowbar.style.zIndex = "4";
			}
			
			slide_show_timer = setTimeout( "flashair.Lengthen_Ss_Bar()", flashair.SLIDESHOWBARTIME );
		}
		else{
			flashair.Clear_SlideShow();
			window.scrollTo( 0, 0 );
		}
	},
	Clear_SlideShow : function(){
		if( slide_show_flag == "ON" ){
			slide_show_flag = "OFF";
			document.getElementById("slide_show_b").className = "slide_show_a_b";
			document.getElementById("slideshowbar").style.display = "none";
			document.getElementById("ssbar").style.width = "0px";
			ss_bar_cnt = 0;
			clearTimeout( slide_show_timer );
		}
	},
	Lengthen_Ss_Bar : function(){
		ss_bar_cnt++;
		
		document.getElementById("ssbar").style.width = (ss_bar_cnt * flashair.SLIDESHOWBARBLOCK) + "px";
		
		if( ss_bar_cnt == flashair.SLIDESHOWBARNICK ){
			ss_bar_cnt = 0;
			slide_show_timer = setTimeout( "flashair.Right_Img(0)", flashair.SLIDESHOWNEXT );
		}
		else{
			slide_show_timer = setTimeout( "flashair.Lengthen_Ss_Bar()", flashair.SLIDESHOWBARTIME );
		}
	},
	Change_Size : function( org_no ){
		flashair.Clear_SlideShow();
		clearInterval( set_navi_actual_timer );
		
		if( flashair.now_disp_mode == "actual_disp" ){
			flashair.Zoom_Img_Window( org_no, 1 );
		}
		else{
			flashair.Zoom_Img_Actual( org_no, 1 );
		}
	},
	Return_Thumbnail : function(){
		
		var bw = document.documentElement.clientWidth;
		
		var meta = document.getElementById("meta_id");
		meta.content = "width=device-width,initial-scale=1.0,user-scalable=yes";
		
		var title = document.getElementById("title");
		title.style.position = "static";
		title.style.width = "";
		title.className = "title_nonfilter";
		
		var img_button = document.getElementById("img_button");
		img_button.style.position = "static";
		img_button.className = "img_button_nonfilter";
		
		var slideshowbar = document.getElementById("slideshowbar");
		slideshowbar.style.position = "static";
		
		flashair.Clear_SlideShow();
		clearInterval( set_navi_actual_timer );
		
		zoom_flag = "none";
		flashair.now_disp_mode = "thumbnail_disp";
		
		var disp_img = document.getElementById("disp_img");
		
		if( disp_img.childNodes.length > 0 ){
			var i;
			var NodeList = disp_img.childNodes;
			var Node = NodeList[0];
			var disp_id = Node.id;
			var disp_id_chk = disp_id.split("image");
			
			if( disp_id_chk.length <= 1 ){
				disp_id_chk = disp_id.split("box_img");
			}
			
			for( i = 0 ; i < LIST.length ; i ++ ){
				document.getElementById("box"+LIST[i].no).className = box_type;
			}
			
			document.getElementById("box"+LIST[disp_id_chk[1]].no).className = box_type + "_sel";
			
			flashair.now_pos = LIST[disp_id_chk[1]].date;
			
			if( flashair.Parent != "" ){
				Node.width /= 2;
				Node.height /= 2;
				flashair.Parent.insertBefore(Node,flashair.Parent.firstChild);
				flashair.Parent = "";
			}
			else{
				disp_img.removeChild(Node);
			}
		}
		else{
			
		}
		
		if( m_mode == "ON" ){
			if( now_share_mode == 'SHAREMODE' ){
				var header = document.getElementById("title_tb_1");
				header.innerHTML = "";
				header.style.width = "150px";
				
				var faheader = document.getElementById("title_tb_2");
				faheader.innerHTML = "";
				faheader.style.width = "0px";
				
				var f_name = document.getElementById("f_name");
				f_name.className = "f_name_s";
				f_name.innerHTML = "<font size='4' id ='nsub_id' color='#0000E6' ><b>"+flashair.Set_Lang("Set_List_Lang_1") +"</b></font>";
				f_name.style.width = bw - (60*3+50) + "px";
				
				var box_change_b = document.getElementById("title_tb_4");
				if( box_type == "box_list" ){
					box_change_b.innerHTML = '<div id="box_change_b" class="box_change_t_b" onclick="flashair.Change_Box_Disply()"></div>';
				}
				else{
					box_change_b.innerHTML = '<div id="box_change_b" class="box_change_l_b" onclick="flashair.Change_Box_Disply()"></div>';
				}
				
				box_change_b.style.width = "50px";
				
				var none = document.getElementById("title_tb_5");
				none.innerHTML = "";
				none.style.width = "0px";
			}
			else {
				if( now_href == "/" ){
					var header = document.getElementById("title_tb_1");
					header.innerHTML = '<div class="header"></div>';
					header.style.width = "150px";
					
					var faheader = document.getElementById("title_tb_2");
					faheader.innerHTML = "";
					faheader.style.width = "0px";
					
					var f_name = document.getElementById("f_name");
					f_name.innerHTML = "";
					f_name.style.width = bw - (60*4+50) + "px";
				}
				else{
					var folder_back_b = document.getElementById("title_tb_1");
					folder_back_b.innerHTML = '<div class="folder_back_b" onclick="flashair.Back_Folder()"></div>';
					folder_back_b.style.width = "50px";
					
					var faheader = document.getElementById("title_tb_2");
					faheader.innerHTML = '<div class="faheader" onclick="flashair.Link_Root_Force()"></div>';
					faheader.style.width = "50px";
					
					var f_name = document.getElementById("f_name");
					var addr = now_href.split("/");
					
					if( addr[addr.length-1] == "" ){
						f_name.innerHTML = decodeURIComponent(addr[addr.length-2]);
					}
					else{
						f_name.innerHTML = decodeURIComponent( addr[addr.length-1]);
					}
					
					f_name.style.width = bw - (60*3+50) + "px";
				}
				
				var box_change_b = document.getElementById("title_tb_4");
				if( box_type == "box_list" ){
					box_change_b.innerHTML = '<div id="box_change_b" class="box_change_t_b" onclick="flashair.Change_Box_Disply()"></div>';
				}
				else{
					box_change_b.innerHTML = '<div id="box_change_b" class="box_change_l_b" onclick="flashair.Change_Box_Disply()"></div>';
				}
				
				box_change_b.style.width = "50px";
				
				var gear_b = document.getElementById("title_tb_5");
				gear_b.innerHTML = '<div class="gear_b" onclick="flashair.Link_Set()"></div>';
				gear_b.style.width = "50px";
			}
		}
		else{
			if( now_href == "/" ){
				if( now_share_mode == "SHAREMODE" ){
					var header = document.getElementById("title_tb_1");
					header.innerHTML = "";
					header.style.width = "150px";
					
					var faheader = document.getElementById("title_tb_2");
					faheader.innerHTML = "";
					faheader.style.width = "0px";
					
					f_name = document.getElementById("f_name");
					f_name.innerHTML = "<font size='4' id ='nsub_id' color='#0000E6' ><b>"+flashair.Set_Lang("Set_FileShare_Lang_0") +"</b></font>";
					f_name.style.width = bw - (60*3+50) + "px";
				}
				else{
					var header = document.getElementById("title_tb_1");
					header.innerHTML = '<div class="header"></div>';
					header.style.width = "150px";
				
					var faheader = document.getElementById("title_tb_2");
					faheader.innerHTML = "";
					faheader.style.width = "0px";
				
					var f_name = document.getElementById("f_name");
					f_name.innerHTML = "";
					f_name.style.width = bw - (60*3+50) + "px";
				}
			}
			else{
				if( now_share_mode == "SHAREMODE" ){
					var header = document.getElementById("title_tb_1");
					header.innerHTML = "";
					header.style.width = "150px";
					
					var faheader = document.getElementById("title_tb_2");
					faheader.innerHTML = "";
					faheader.style.width = "0px";
					
					f_name = document.getElementById("f_name");
					f_name.innerHTML = "<font size='4' id ='nsub_id' color='#0000E6' ><b>"+flashair.Set_Lang("Set_FileShare_Lang_0") +"</b></font>";
					f_name.style.width = bw - (60*3+50) + "px";
				}
				else{
					var folder_back_b = document.getElementById("title_tb_1");
					folder_back_b.innerHTML = '<div class="folder_back_b" onclick="flashair.Back_Folder()"></div>';
					folder_back_b.style.width = "50px";
					
					var faheader = document.getElementById("title_tb_2");
					faheader.innerHTML = '<div class="faheader" onclick="flashair.Link_Root_Force()"></div>';
					faheader.style.width = "50px";
					
					var f_name = document.getElementById("f_name");
					var addr = now_href.split("/");
					
					if( addr[addr.length-1] == "" ){
						f_name.innerHTML = decodeURIComponent(addr[addr.length-2]);
					}
					else{
						f_name.innerHTML = decodeURIComponent(addr[addr.length-1]);
					}
					
					f_name.style.width = bw - (60*2+50) + "px";
				}
			}
			
			var box_change_b = document.getElementById("title_tb_4");
			if( box_type == "box_list" ){
				box_change_b.innerHTML = '<div id="box_change_b" class="box_change_t_b" onclick="flashair.Change_Box_Disply()"></div>';
			}
			else{
				box_change_b.innerHTML = '<div id="box_change_b" class="box_change_l_b" onclick="flashair.Change_Box_Disply()"></div>';
			}
			
			box_change_b.style.width = "50px";
			
			var none = document.getElementById("title_tb_5");
			none.innerHTML = "";
			none.style.width = "0px";
		}
		
		document.body.className = "thumbnail_dsip";
		
		document.getElementById("title").style.display = "block";
		document.getElementById("img_button").style.display = "none";
		document.getElementById("disp_img").style.display = "none";
		document.getElementById("slideshowbar").style.display = "none";
		document.getElementById("thumbnail").style.display = "block";
		document.getElementById("subtitle").style.display = "block";
		document.getElementById("footer").style.display = "block";
		
		if( now_share_mode == "SHAREMODE" ){
			f_name.className = "f_name_s";
			
			if(m_mode == "ON"){
				document.getElementById("brset").style.display = "none";
				document.getElementById("sharessid").style.display = "none";
				document.getElementById("sharepass").style.display = "none";
			}
		}
		
		reload_timer = window.setTimeout( "flashair.Reload_File()", flashair.RELOADTIME );
		
		if( tab_mode == 1 ){
			location.href = "#tab" + flashair.now_pos;
		}
		else{
			
		}
	},
	Left_Img : function(){
		var now_jp_no;
		var left_no;
		
		flashair.Clear_SlideShow();
		clearInterval( set_navi_actual_timer );
		
		zoom_flag = "none";
		
		for( i = 0; i < jpg_cnt; i ++ ){
			if( now_jpg_src == jpg_src[i] ){
				if( i == 0 ){
					now_jp_no = jpg_cnt - 1;
					break;
				}
				else{
					now_jp_no = i - 1;
					break;
				}
			}
		}
		
		for( i = 0; i < LIST.length; i ++ ){
			if( jpg_src[now_jp_no] == LIST[i].href ){
				left_no = LIST[i].no;
				break;
			}
		}
		
		if( flashair.now_disp_mode == "window_disp" ){
			flashair.Zoom_Img_Window( left_no, 1 );
		}
		else{
			flashair.Zoom_Img_Actual( left_no, 1 );
		}
	},
	Right_Img : function( clear_flag ){
		var bw = document.documentElement.clientWidth;
		var now_jp_no;
		var right_no;
		
		if( clear_flag == 1 ){
			flashair.Clear_SlideShow();
		}
		
		clearInterval( set_navi_actual_timer );
		
		if( slide_show_flag == "ON" ){
			document.getElementById("ssbar").style.width = "0px";
		}
		
		zoom_flag = "none";
		
		for( i = 0 ; i < jpg_cnt; i ++ ){
			if( now_jpg_src == jpg_src[i] ){
				if( i == ( jpg_cnt - 1 ) ){
					now_jp_no = 0;
					break;
				}
				else{
					now_jp_no = i + 1;
					break;
				}
			}
		}
		
		for( i = 0; i < LIST.length; i ++ ){
			if( jpg_src[now_jp_no] == LIST[i].href ){
				right_no = LIST[i].no;
				break;
			}
		}
		
		if( flashair.now_disp_mode == "window_disp" ){
			flashair.Zoom_Img_Window( right_no, clear_flag );
		}
		else{
			flashair.Zoom_Img_Actual( right_no, clear_flag );
		}
	},
	PreLoad : function( now_jp_no ){
		now_jp_no = Number(now_jp_no);
		
		if( ( jpg_cnt == 0 ) || ( jpg_cnt == 1 ) ){
			/* no action */
		}
		else{
			now_jpg_l = new Image();
			
			if( now_jp_no == 0 ){
				now_jpg_l.src = jpg_src[(jpg_cnt- 1)];
			}
			else{
				now_jpg_l.src = jpg_src[now_jp_no-1];
			}
			
			now_jpg_r = new Image();
			if( now_jp_no == ( jpg_cnt - 1 ) ){
				now_jpg_r.src = jpg_src[0];
			}
			else{
				now_jpg_r.src = jpg_src[now_jp_no+1];
			}
		}
	},
	Check_TimeStamp : function( ts ){
		if( save_ts == ts ){
			return "Same";
		}
		else{
			save_ts = ts;
			return "Diff";
		}
	},
	Reload_File : function(){
		if( ( flashair.now_disp_mode == "actual_disp" ) || ( flashair.now_disp_mode == "window_disp" ) ){
			return;
		}
		
		if( now_share_mode == "SHAREMODE" ){
			return;
		}
		
		var dd = new Date();
		Reload_httpObj = new XMLHttpRequest();
		Reload_httpObj.open("GET", '/command.cgi?op=121&TIME='+dd.getTime(), true);
		Reload_httpObj.onreadystatechange = function(){
			if( ( Reload_httpObj.readyState == 4 ) && ( Reload_httpObj.status == 200 ) ){
				if( flashair.Check_TimeStamp( Reload_httpObj.responseText ) == "Diff" ){
					var dir;
					if( ( now_href.length > 1 ) && ( now_href.charAt(now_href.length-1) == "/" ) ){
						dir = now_href.substr( 0, now_href.length - 1 );
					}
					else{
						dir = now_href;
					}
					
					httpObj = new XMLHttpRequest();
					httpObj.open("GET", '/command.cgi?op=100&DIR='+dir+'&TIME='+dd.getTime(), false);
					httpObj.send(null);
					var filelist_text = httpObj.responseText.split("\r\n");
					for( i = 0 ; i < LIST.length ; i ++ ){
						for( j = 1 ; j < filelist_text.length - 1 ; j ++ ){
							var del_chk = new flashair.List_Info( filelist_text[j], j );
							
							if( LIST[i].name == del_chk.name ){
								break;
							}
						}
						
						if( j == ( filelist_text.length -1 ) ){
							var del_tmp = LIST[i];
							del_no_list.push(del_tmp.no);
							LIST.splice( i, 1 );
							flashair.Del_Box( del_tmp );
							i = -1;
						}
					}
					
					for( j = 1 ; j < filelist_text.length - 1 ; j ++ ){
						var add_tmp = new flashair.List_Info( filelist_text[j], j );
						
						for( i = 0 ; i < LIST.length ; i ++ ){
							if( add_tmp.name == LIST[i].name ){
								break;
							}
						}
						
						if( i == LIST.length ){ 
							if( ( add_tmp.attr & 0x02 ) || ( add_tmp.attr & 0x04 ) || ( add_tmp.attr & 0x08 ) ){
							}
							else{
								LIST.push(add_tmp);
								if( del_no_list.length == 0 ){
									add_tmp.no = LIST.length - 1;
								
								}
								else{
									add_tmp.no = del_no_list[0];
									del_no_list.splice( 0, 1 );
								}
								
								LIST.sort(
									function(a, b){
										if( eval(a.date) == eval(b.date) ){
											return eval(b.time - a.time);
										}
										else{
											return eval(b.date - a.date);
										}
									}
								);
								
								flashair.Add_Box( add_tmp );
							}
						}
					}
					
					jpg_cnt = 0;
					
					for( i = 0 ; i < LIST.length ; i ++ ){
						if( !( LIST[i].attr & 0x10 ) ){
							var ext_lc = LIST[i].ext.toLowerCase();
							
							if( ( ext_lc == "jpg" ) || ( ext_lc == "jpeg" ) ){
								jpg_src[jpg_cnt] = LIST[i].href;
								jpg_cnt++;
							}
						}
					}
				}
				
				reload_timer = window.setTimeout( "flashair.Reload_File()", flashair.RELOADTIME );
			}
			else if( ( Reload_httpObj.readyState == 4 ) && ( Reload_httpObj.status != 200 ) ){
//				clearTimeout( reload_timer );
			}
		}
		
		Reload_httpObj.send(null);
	},
	Add_Box : function( add_file ){
		var i;
		var box_main_w = "0px";
		var add_mode = "";
		var insert_tile_position = 0;
		var box_main = "";
		var box_img = "";
		var box_br = "";
		var st = "";
		var chk_etile;
		var etile;
		var ebox = document.createElement("div");
		var box_td1_align;
		
		ebox.id = "box"+add_file.no;
		
		if( box_type == "box_tile" ){
			ebox.className = "box_tile";
			box_main = "box_main_tile";
			box_img = "thumb_img_tile";
			box_br = "br_tile";
			box_td1_align = "center";
		}
		else{
			ebox.className = "box_list";
			box_main = "box_main_list";
			box_img = "thumb_img_list";
			box_br = "br_list";
			box_td1_align = "left";
		}
		
		if( tab_mode == 1 ){
			chk_etile = document.getElementById("til"+add_file.date);
			if( !chk_etile ){
				add_mode = "tab_box";
				
				for( i = 0 ; i < LIST.length ; i ++ ){
					if( add_file.date > LIST[i].date ){
						insert_tile_position = LIST[i].date;
						break;
					}
				}
				
				if( i == LIST.length ){
					insert_tile_position = "none";
				}
			}
			else{
				add_mode = "box_only";
			}
		}
		else{
			add_mode = "box";
		}
		
		if( !( add_file.attr & 0x10 ) ){
			var ext_lc = add_file.ext.toLowerCase();
			
			if( ( ext_lc == "jpg" ) || ( ext_lc == "jpeg" ) ){
				st += '<table border="0" cellspacing="0" cellpadding="0" width="100%"><tr>';
				st += '<td id="box_td1'+add_file.no+'" align="'+box_td1_align+'" onclick="flashair.Zoom_Img('+add_file.no+')">';
				st += '<div id="box_main'+add_file.no+'" class="'+box_main+'" style="width:'+box_main_w+'">';
				st += '<img id="box_img'+add_file.no+'" src="/~/photo.png" width="80" height="60" name="n'+add_file.no+'" class="'+box_img+'"><br id="box_br'+add_file.no+'" class="'+box_br+'">'+add_file.name+'</div></td>';
				st += '<td align="right" onclick="flashair.Disp_Box_Info('+add_file.no+')" width="80px">';
				st += '<div id="box_info'+add_file.no+'" class="box_info"></div>';
				st += '</td></tr></table>';
			}
			else{
				st += '<table border="0" cellspacing="0" cellpadding="0" width="100%"><tr>';
				st += '<td id="box_td1'+add_file.no+'" align="'+box_td1_align+'"><a href="'+add_file.href+'">';
				st += '<div id="box_main'+add_file.no+'" class="'+box_main+'" style="width:'+box_main_w+'">';
				st += '<img id="box_img'+add_file.no+'" src="'+add_file.icon+'" width="80" height="60" name="n'+add_file.no+'" class="'+box_img+'"><br id="box_br'+add_file.no+'" class="'+box_br+'">'+add_file.name+'</div></a></td>';
				st += '<td align="right" onclick="flashair.Disp_Box_Info('+add_file.no+')" width="80px">';
				st += '<div id="box_info'+add_file.no+'" class="box_info"></div>';
				st += '</td></tr></table>';
			}
		}
		else{
			if(  ( add_file.name == "DCIM" ) && ( add_file.path == "/" ) ){
				st += '<table border="0" cellspacing="0" cellpadding="0" width="100%"><tr>';
				st += '<td id="box_td1'+add_file.no+'" align="'+box_td1_align+'" onclick="flashair.Link_List('+add_file.no+')">';
				st += '<div id="box_main'+add_file.no+'" class="'+box_main+'" style="width:'+box_main_w+'">';
				st += '<img id="box_img'+add_file.no+'" src="/~/dcim.png" width="80" height="60" name="n'+add_file.no+'" class="'+box_img+'"><br id="box_br'+add_file.no+'" class="'+box_br+'">'+add_file.name+'</div></td>';
				st += '<td align="right" onclick="flashair.Disp_Box_Info('+add_file.no+')" width="80px">';
				st += '<div id="box_info'+add_file.no+'" class="box_info"></div>';
				st += '</td></tr></table>';
			}
			else{
				st += '<table border="0" cellspacing="0" cellpadding="0" width="100%"><tr>';
				st += '<td id="box_td1'+add_file.no+'" align="'+box_td1_align+'" onclick="flashair.Link_List('+add_file.no+')">';
				st += '<div id="box_main'+add_file.no+'" class="'+box_main+'" style="width:'+box_main_w+'">';
				st += '<img id="box_img'+add_file.no+'" src="/~/folder.png" width="80" height="60" name="n'+add_file.no+'" class="'+box_img+'"><br id="box_br'+add_file.no+'"r class="'+box_br+'">'+add_file.name+'</div></td>';
				st += '<td align="right" onclick="flashair.Disp_Box_Info('+add_file.no+')" width="80px">';
				st += '<div id="box_info'+add_file.no+'" class="box_info"></div>';
				st += '</td></tr></table>';
			}
		}
		
		ebox.innerHTML = st;
		
		if( add_mode == "box_only" ){
			etile = document.getElementById("til"+add_file.date);
			var node = etile.childNodes;
			etile.insertBefore( ebox, node[0] );
		}
		else if( add_mode == "tab_box" ){
			flashair.Add_Tile( add_file, insert_tile_position );
			etile = document.getElementById("til"+add_file.date);
			etile.appendChild( ebox );
		}
		else{
			etile = document.getElementById("thumbnail");
			var node = etile.childNodes;
			if( node.length == 0 ){
				etile.appendChild( ebox );
			}
			else{
				etile.insertBefore( ebox, node[0] );
			}
		}
		
		if( box_type == "box_list" ){
			var bw = document.documentElement.clientWidth;
			box_main_w = (bw-80) + "px";
			
			document.getElementById("box_info"+add_file.no).style.display = "block";
		}
		else{
			box_main_w = "80px";
			
			document.getElementById("box_info"+add_file.no).style.display = "none";
		}
		
		var box_main_e = document.getElementById("box_main"+add_file.no);
		box_main_e.style.width = box_main_w;
		
		var box = document.images[("n" + add_file.no)];
		box.onload = function(){
			if( this.width > 30 ){
				if( ( this.width == 120 ) && ( this.height == 160 ) ){
					this.width = this.width * (3.0/8.0);
					this.height = this.height * (3.0/8.0);
					this.style.marginLeft = "18px";
					this.style.marginRight = "17px";
				}
			}
		};
		box.onerror = function(){
			this.src = "/~/photo.png";
		};
		
		box.src = add_file.icon;
	},
	Add_Tile : function( add_file, in_pos ){
		var insert_node;
		var st;
		var bw = document.documentElement.clientWidth;
		var td_date_w = bw - 90;
		var td_button_w = 30;
		
		d = add_file.date  & 0x1f; 
		m = (add_file.date  & 0x1e0) >> 5; 
		y = ((add_file.date  & 0xfe00) >> 9) + 1980;
		
		if( in_pos == "none" ){
			insert_node = document.getElementById("thumbnail_end");
		}
		else{
			insert_node = document.getElementById("dmy"+in_pos);
		}
		
		var add_tab = document.createElement("div");
		add_tab.id = "dmy"+add_file.date;
		add_tab.className = "dummy_tab";
		
		st  = "<table border='0' cellspacing='0' cellpadding='0' id='tab"+add_file.date+"' class='tab'>";
		st += "<tr align='center'>";
		st += "<td id='tab_data_1' align='left' width='"+td_button_w+"' onclick='flashair.Act_Tab("+add_file.date+")'>";
		st += "<div id='tab_oc"+add_file.date+"' class='tab_close_b'></div>";
		st += "</td>";
		st += "<td id='tab_data_2' align='left' width='"+td_date_w+"' onclick='flashair.Act_Tab("+add_file.date+")'>";
		st += y+'/'+m+'/'+d;
		st += "</td>";
		st += "<td id='tab_data_3' align='center' width='"+td_button_w+"'>";
		st += "<div id='tab_j_u"+add_file.date+"' class=\"tab_up_b\" onclick=\"flashair.Tab_UP("+add_file.date+")\"></div>";
		st += "</td>";
		st += "<td id='tab_data_4' align='center' width='"+td_button_w+"'>";
		st += "<div id='tab_j_d"+add_file.date+"' class=\"tab_down_b\" onclick=\"flashair.Tab_Down("+add_file.date+")\"></div>";
		st += "</td>";
		st += "</tr>";
		st += "</table>";
		st += "<div id='til"+add_file.date+"' class='tile'>";
		add_tab.innerHTML = st;
		
		var thum = document.getElementById("thumbnail");
		thum.insertBefore( add_tab, insert_node );
	},
	
	Del_Box : function( del_file ){
		var del_mode = "";
		
		if( tab_mode == 1 ){
			var chk_etile = document.getElementById("til"+del_file.date);
			if( !chk_etile ){
				del_mode = "box";
			}
			else{
				for( i = 0 ; i < LIST.length ; i ++ ){
					if( del_file.date == LIST[i].date ){
						break;
					}
				}
				
				if( i == LIST.length ){
					del_mode = "tab_box";
				}
				else{
					del_mode = "box_only";
				}
			}
		}
		else{
			del_mode = "box";
		}
		
		if( del_mode == "tab_box" ){
			var thum = document.getElementById("thumbnail");
			var edmy = document.getElementById("dmy"+del_file.date);
			thum.removeChild(edmy);
		
		}
		else if( del_mode == "box_only" ){
			var ebox = document.getElementById("box"+del_file.no);
			chk_etile.removeChild(ebox);
		}
		else{
			var thum = document.getElementById("thumbnail");
			var ebox = document.getElementById("box"+del_file.no);
			thum.removeChild(ebox);
		}
	},
	browserLanguage : function () {
		try {
			var lang;
			lang = (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2);
			
			if( lang == 'en' ){
				var dd = new Date();
				httpObj = new XMLHttpRequest();
				httpObj.open("GET","/command.cgi?op=107&TIME="+dd.getTime(),false);
				httpObj.send(null);
				if( httpObj.responseText.substr(17,2) == 'zh' ){
					lang = httpObj.responseText.substr(17,5);
					lang = lang.toLowerCase();
					
					if( ( lang == 'zh-cn' ) || ( lang == 'zh-tw' ) ){
						return lang;
					}
					else{
						lang = httpObj.responseText.substr(17,10);
						lang = lang.toLowerCase();
						
						if( lang == 'zh-hans-cn' ){
							lang = 'zh-cn';
						}
						else if( lang == 'zh-hant-tw' ){
							lang = 'zh-tw';
						}
						else{
							lang = 'zh';
						}
						
						return lang;
					}
				}
				else{
					return httpObj.responseText.substr(17,2);
				}
			}
			else if( lang == 'zh' ){
				return (navigator.browserLanguage || navigator.language || navigator.userLanguage);
			}
			return lang;
		}
		catch(e) {
			return undefined;
		}
	},
	Set_Lang : function( lang_name ){
		if(flashair.lang_info == ''){
			flashair.lang_info = flashair.browserLanguage();
			flashair.lang_info = flashair.lang_info.toLowerCase();
			
			if(flashair.lang_info == 'ja'){
			} else if(flashair.lang_info == 'fr'){
			} else if(flashair.lang_info == 'it'){
			} else if(flashair.lang_info == 'de'){
			} else if(flashair.lang_info == 'es'){
			} else if(flashair.lang_info == 'zh-tw'){
			} else if(flashair.lang_info == 'zh-cn'){
			} else if(flashair.lang_info == 'ko'){
			} else {
				flashair.lang_info = 'en';
			}
		}
		return lang_list[flashair.lang_info][lang_name];
	},
	Read_Version : function(){
		var dd = new Date();
		
		httpObj = new XMLHttpRequest();
		httpObj.open("GET",'/command.cgi?op=108'+'&TIME='+dd.getTime(),false);
		httpObj.send(null);
		
		return httpObj.responseText;
	},
	Read_SSID : function(){
		var dd = new Date();
		httpObj = new XMLHttpRequest();
		httpObj.open("GET",'/command.cgi?op=104&TIME='+dd.getTime(),false);
		httpObj.send(null);
		
		return httpObj.responseText;
	},
	Read_PW : function(){
		var dd = new Date();
		httpObj = new XMLHttpRequest();
		httpObj.open("GET",'/command.cgi?op=105&TIME='+dd.getTime(),false);
		httpObj.send(null);
		
		return httpObj.responseText;
	},
	Set_Setting_Back : function(){
		if( document.getElementById("wifi_subtitle").style.display == "block" ){
			flashair.Set_Setting_Root();
		}
		else if( document.getElementById("mode_subtitle").style.display == "block" ){
			flashair.Set_Setting_Mode_Back();
		}
		else if( document.getElementById("intromode_subtitle").style.display == "block" ){
			flashair.Set_Setting_IntroMode_Back();
		}
		else if( document.getElementById("introshare_subtitle").style.display == "block" ){
			flashair.Set_Setting_IntroShare_Back();
		}
		else{
			location.href = '/';
		}
	},
	Set_Setting_Forward : function(){
		if( document.getElementById("intromode_subtitle").style.display == "block" ){
			flashair.Set_Setting_IntroMode_flag();
			flashair.Set_Setting_Mode();
		}
		else if( document.getElementById("introshare_subtitle").style.display == "block" ){
			flashair.Set_Setting_Mode_PhotoShare();
		}
		else{
			
		}
	},
	Set_Setting_Root_Help : function(){
		var st="";
		
		for(i=0;i<10;i++){
			st += flashair.Set_Lang("Set_Help_Lang_Set_"+i);
		}
		
		alert(st);
	},
	Show_Setting_WiFi_CheckBox : function(){
		
		var checkbox1_obj = document.getElementById("wifi_checkbox1");
		var checkbox2_obj = document.getElementById("wifi_checkbox2");
		var tab_open_obj = document.getElementById("tab_open_b_id");
		var tab_close_obj = document.getElementById("tab_close_b_id");
		
		if( checkbox1_obj.style.display == "none" ){
			checkbox1_obj.style.display = "block";
			checkbox2_obj.style.display = "block";
			tab_open_obj.style.display = "none";
			tab_close_obj.style.display = "block";
		}
		else{
			var format_id1_obj = document.getElementById("wifi_format_id1");
			var format_id2_obj = document.getElementById("wifi_format_id2");
			if( ( format_id1_obj.checked != true ) && ( format_id2_obj.checked != true ) ){
				checkbox1_obj.style.display = "none";
				checkbox2_obj.style.display = "none";
				tab_open_obj.style.display = "block";
				tab_close_obj.style.display = "none";
			}
		}
	},
	Check_Setting_WiFi_CheckBox : function( obj ){
		var format_id1_obj = document.getElementById("wifi_format_id1");
		var format_id2_obj = document.getElementById("wifi_format_id2");
		
		if( obj == format_id1_obj ){
			if( format_id2_obj.checked == true ){
				format_id2_obj.checked = false;
			}
			
			document.wifi_form.APPSSID.disabled = false;
			document.wifi_form.APPNETWORKKEY.disabled = false;
		}
		else {
			if( format_id1_obj.checked == true ){
				format_id1_obj.checked = false;
			}
			
			if(format_id2_obj.checked == false){
				document.wifi_form.APPSSID.disabled = false;
				document.wifi_form.APPNETWORKKEY.disabled = false;
			}
			else {
				document.wifi_form.APPSSID.disabled = true;
				document.wifi_form.APPNETWORKKEY.disabled = true;
			}
		}
	},
	Check_Setting_WiFi_SSIDStr : function(){
		var str = document.wifi_form.APPSSID.value;
		
		if( str.length != 0 ){
			if( str.match( /[^ -~]+/) ){
				return "NG";
			}
		}
		
		return "OK";
	},
	Check_Setting_WiFi_PWStr : function(){
		var str = document.wifi_form.APPNETWORKKEY.value;
		
		if( str.length != 0 ){
			if( str.match( /[^ -~]+/) ){
				return "NG";
			}
		}
		
		return "OK";
	},
	Register_Setting_WiFi : function(){
		var ssid = document.wifi_form.APPSSID.value;
		var key = document.wifi_form.APPNETWORKKEY.value;
		var dd = new Date();
		var format_id2_obj = document.getElementById("wifi_format_id2");
		
		if( format_id2_obj.checked == true ){
			if( window.confirm( flashair.Set_Lang("Set_Config_Lang_10") ) ){
				httpObj = new XMLHttpRequest();
				httpObj.open("GET",'/config.cgi?MASTERCODE='+mastercode+'&FORMATSETMODE=4&NOMODIFY=1&TIME='+dd.getTime(),false);
				httpObj.send(null);
				
				if( httpObj.responseText == 'SUCCESS' ){
					window.alert( flashair.Set_Lang("Set_Config_Lang_2") );
					flashair.Change_Setting_WiFi_SSID();
				}
				else{
					window.alert( flashair.Set_Lang("Set_Config_Lang_3") );
					location.href = "/";
				}
			}
			else{
				if(welcome_flag == 1){
					location.href = "/";
				}
			}
		}
		else {
			if( flashair.Check_Setting_WiFi_SSIDStr() == "NG" ){
				if( flashair.Check_Setting_WiFi_PWStr() == "NG" ){
					alert( flashair.Set_Lang("Set_Config_Lang_13") + document.wifi_form.APPSSID.value + "\n" +
					flashair.Set_Lang("Set_Config_Lang_11") + document.wifi_form.APPNETWORKKEY.value + "\n\n" +
					flashair.Set_Lang("Set_Config_Lang_14") );
					document.wifi_form.APPSSID.value = "";
					document.wifi_form.APPNETWORKKEY.value = "";
					return;
				}
				else{
					alert( flashair.Set_Lang("Set_Config_Lang_13") + document.wifi_form.APPSSID.value + "\n\n" + flashair.Set_Lang("Set_Config_Lang_14") );
					document.wifi_form.APPSSID.value = "";
					return;
				}
			}
			else{
				if( flashair.Check_Setting_WiFi_PWStr() == "NG" ){
					alert( flashair.Set_Lang("Set_Config_Lang_11") + document.wifi_form.APPNETWORKKEY.value + "\n\n" + flashair.Set_Lang("Set_Config_Lang_14") );
					document.wifi_form.APPNETWORKKEY.value = "";
					return;
				}
			}
			
			str = document.wifi_form.APPNETWORKKEY.value;
			if(( str.length == 0 )||( 8 <= str.length)){
				if( window.confirm( flashair.Set_Lang("Set_Config_Lang_1")+'SSID:'+ssid+'\r\n'+ flashair.Set_Lang("Set_Config_Lang_11")+key ) ){
					var format_id1_obj = document.getElementById("wifi_format_id1");
					httpObj = new XMLHttpRequest();
					
					if( format_id1_obj.checked == true ){
						httpObj.open("GET",'/config.cgi?MASTERCODE='+mastercode+'&APPSSID='+ssid+'&APPNETWORKKEY='+key+'&FORMATSETMODE=1&TIME='+dd.getTime(),false);
					}
					else {
						httpObj.open("GET",'/config.cgi?MASTERCODE='+mastercode+'&APPSSID='+ssid+'&APPNETWORKKEY='+key+'&FORMATSETMODE=0&TIME='+dd.getTime(),false);
					}
					
					httpObj.send(null);
					
					if( httpObj.responseText == 'SUCCESS' ){
						window.alert( flashair.Set_Lang("Set_Config_Lang_2") );
						cnt=0;
						sessionStorage.setItem("ssid_check_flag", "0");
						flashair.Change_Setting_WiFi_SSID();
					}
					else{
						window.alert( flashair.Set_Lang("Set_Config_Lang_3") );
						location.href = "/";
					}
				}
				else{
					if(welcome_flag == "1"){
						location.href = "/";
					}
				}
			} else {
				alert(flashair.Set_Lang("Set_Config_Lang_12"));
			}
		}
	},
	Change_Setting_WiFi_SSID : function(){
		var flag = sessionStorage.getItem("ssid_check_flag");
		if( flag == "1" ){
			var ssid = document.forms[0].APPSSID.value;
			var dd = new Date();
			httpObj = new XMLHttpRequest();
			httpObj.open("GET",'/command.cgi?op=104&TIME='+dd.getTime(),false);
			httpObj.send(null);
			
			if( httpObj.responseText == ssid ){
				location.href = "/";
				cnt = 0;
			}
			else {
				if( cnt < 300 ){
					setTimeout( "Change_Setting_WiFi_SSID()", 1000 );
					cnt ++
				}
			}
		}else{
			setTimeout( "flashair.Change_Setting_WiFi_SSID()", 1000 );
			cnt ++;
			if( cnt==25 ){
				sessionStorage.setItem("ssid_check_flag", "1");
			}
		}
	},
	Set_Setting_Mode_Auto : function(){
		document.getElementById("mode_timeout").disabled = false;
		document.getElementById("mode_pic_change_id").disabled = true;
		
		document.getElementById("mode_time_id").style.color="black";
		document.getElementById("mode_selpic_id").style.color="gray";
		document.getElementById("css_pic_change_button_str").style.color="gray";
		document.getElementById("mode_file_id").style.color="gray";
		document.getElementById("mode_cautions").style.color="gray";
		
		document.getElementById("mode_auto_id").checked = true;
		
		if( func_scroll_cipath_timer ){
			clearInterval( func_scroll_cipath_timer );
		}
		
		var now_b = flashair.Get_Browser();
		if(( now_b == "Firefox" )||( now_b == "GoogleChrome" )||( now_b == "Opera" )||( now_b == "Safari" )){
			document.images["mode_image_name"].style.opacity = '0.25';
		} else {
			document.images["mode_image_name"].style.filter = 'alpha( opacity=25 )';
		}
		
		if( ( appmode == '6' ) || ( appmode == '3' ) ){
			appmode = '6';
		}
		else{
			appmode = '4';
		}
	},
	Set_Setting_Mode_Manual : function(){
		document.getElementById("mode_timeout").disabled = true;
		document.getElementById("mode_pic_change_id").disabled = false;
		
		document.getElementById("mode_time_id").style.color="gray";
		document.getElementById("mode_selpic_id").style.color="black";
		document.getElementById("css_pic_change_button_str").style.color="black";
		document.getElementById("mode_file_id").style.color="black";
		document.getElementById("mode_cautions").style.color="black";
		
		document.getElementById("mode_pic_id").checked = true;
		
		var now_b = flashair.Get_Browser();
		if(( now_b == "Firefox" )||( now_b == "GoogleChrome" )||( now_b == "Opera" )||( now_b == "Safari" )){
			document.images["mode_image_name"].style.opacity = '1.00';
		} else {
			document.images["mode_image_name"].style.filter = 'alpha( opacity=100 )';
		}
		
		if( cipath ){
			if(flashair.cipath_cut != "No Image"){
				cipath_name_pos = 0;
				document.getElementById("mode_file_id").innerHTML = flashair.cipath_cut;
//				func_scroll_cipath_timer = window.setTimeout( "flashair.Scroll_Setting_Mode_CIPath()", 500 );
			}
		}
		
		if( ( appmode == '6' ) || ( appmode == '3' ) ){
			appmode = '3';
		}
		else{
			appmode = '0';
		}
	},
	Scroll_Setting_Mode_CIPath : function(){
		if( cipath.length > cipath_name_pos ){
			cipath_name_pos++;
		}
		else{
			cipath_name_pos = 0;
		}
		
		flashair.cipath_cut = cipath.substring( cipath_name_pos, cipath_name_pos + flashair.CIPATH_DISP_LENGTH );
		
		if( flashair.cipath_cut.length < flashair.CIPATH_DISP_LENGTH ){
			var i;
			var limit = flashair.CIPATH_DISP_LENGTH - flashair.cipath_cut.length;
			
			if( limit < 5 ){
				for( i = 0; i < limit; i++ ){
					flashair.cipath_cut += "\u00A0";
				}
			}
			else{
				for( i = 0; i < 5; i++ ){
					flashair.cipath_cut += "\u00A0";
				}
				
				cipath_recut = cipath.substring( 0, 0 + ( limit - 5 ) );
				flashair.cipath_cut = flashair.cipath_cut + cipath_recut;
			}
		}
		
		document.getElementById("mode_file_id").innerHTML = flashair.cipath_cut;
		
		func_scroll_cipath_timer = window.setTimeout( "flashair.Scroll_Setting_Mode_CIPath()", 500 );
	},
	Check_Setting_Mode_CISize : function(){
		var w = document.images["mode_image_name"].naturalWidth|document.images["mode_image_name"].width;
		var h = document.images["mode_image_name"].naturalHeight|document.images["mode_image_name"].height;
		document.getElementById("mode_image_id").width = 160;
		document.getElementById("mode_image_id").height = 160*(h/w);
		if( (w == 0) || (h == 0) ){
			func_cisize_timer = window.setTimeout("flashair.Check_Setting_Mode_CISize()",1000);
		}
	},
	
	Set_Setting_Mode_CIPath : function(){
		if( document.getElementById("mode_pic_change_id").disabled == false ){
			sessionStorage.setItem("cipath", cipath );
			location.href = "/~/stpicpth.htm";
		}
	},
	Set_Setting_Mode_PhotoShare : function(){
		flashair.Set_Setting_IntroShare_flag();
		
		location.href = "/~/phtshare.htm";
	},
	Register_Setting_Mode : function(){
		httpObj = new XMLHttpRequest();
		var dd = new Date();
		
		if( ( appmode == '4' ) || ( appmode == '6' ) ){
			apptime = document.getElementById("mode_timeout").value;
			httpObj.open("GET", '/config.cgi?MASTERCODE='+mastercode+'&APPAUTOTIME='+apptime+'&APPMODE=' +appmode+ '&TIME='+dd.getTime(), false);
		}
		else if( ( appmode == '0' ) || ( appmode == '3' ) ){
			if( document.getElementById("no_img_id").style.display == "none" ){
				httpObj.open("GET", '/config.cgi?MASTERCODE='+mastercode+'&CIPATH='+cipath+'&APPMODE=' +appmode+ '&TIME='+dd.getTime(), false);
			}
			else{
				alert(flashair.Set_Lang("Set_Mode_Lang_17"));
				return;
			}
		}
		else{
			apptime = document.getElementById("mode_timeout").value;
			httpObj.open("GET", '/config.cgi?MASTERCODE='+mastercode+'&APPAUTOTIME='+apptime+'&APPMODE=' +appmode+ '&TIME='+dd.getTime(), false);
		}
		
		httpObj.send(null);
		
		if( httpObj.responseText != 'SUCCESS' ){
			alert(flashair.Set_Lang("Set_Config_Lang_3"));
			location.href = "/";
		}
		else{
			alert( flashair.Set_Lang("Set_Mode_Lang_10") );
		}
	},
	Set_Setting_Root : function(){
		var l_addr = "Root";
		sessionStorage.setItem( "local_setting_addr", l_addr );
		
		document.getElementById("root_subtitle").style.display = "block";
		
		document.getElementById("root_version").style.display = "block";
		document.getElementById("root_help").style.display = "block";
		document.getElementById("setting_root").style.display = "block";
		
		document.getElementById("wifi_subtitle").style.display = "none";
		document.getElementById("setting_wifi").style.display = "none";
		
		document.getElementById("mode_subtitle").style.display = "none";
		document.getElementById("mode_help").style.display = "none";
		document.getElementById("setting_mode").style.display = "none";
		
		document.getElementById("intromode_subtitle").style.display = "none";
		document.getElementById("setting_intromode").style.display = "none";
		
		document.getElementById("introshare_subtitle").style.display = "none";
		document.getElementById("setting_introshare").style.display = "none";
		
		document.getElementById("forward").style.display = "none";
	},
	Set_Setting_WiFi : function(){
		var l_addr = "WiFi";
		sessionStorage.setItem( "local_setting_addr", l_addr );
		
		document.getElementById("root_subtitle").style.display = "none";
		
		document.getElementById("root_version").style.display = "none";
		document.getElementById("root_help").style.display = "none";
		document.getElementById("setting_root").style.display = "none";
		
		document.getElementById("wifi_subtitle").style.display = "block";
		document.getElementById("setting_wifi").style.display = "block";
		
		document.getElementById("mode_subtitle").style.display = "none";
		document.getElementById("mode_help").style.display = "none";
		document.getElementById("setting_mode").style.display = "none";
		
		document.getElementById("intromode_subtitle").style.display = "none";
		document.getElementById("setting_intromode").style.display = "none";
		
		document.getElementById("introshare_subtitle").style.display = "none";
		document.getElementById("setting_introshare").style.display = "none";
		
		document.getElementById("forward").style.display = "none";
		
		if(welcome_flag == "1"){
			document.getElementById("back_b").style.display = "none";
		}
		
		var format_id1_obj = document.getElementById("wifi_format_id1");
		if( format_id1_obj.checked == true ){
			flashair.Show_Setting_WiFi_CheckBox();
		}
	},
	Set_Setting_Mode : function(){
		var l_addr = "Mode";
		sessionStorage.setItem( "local_setting_addr", l_addr );
		
		document.getElementById("root_subtitle").style.display = "none";
		
		document.getElementById("root_version").style.display = "none";
		document.getElementById("root_help").style.display = "none";
		document.getElementById("setting_root").style.display = "none";
		
		document.getElementById("wifi_subtitle").style.display = "none";
		document.getElementById("setting_wifi").style.display = "none";
		
		document.getElementById("mode_subtitle").style.display = "block";
		document.getElementById("mode_help").style.display = "block";
		document.getElementById("setting_mode").style.display = "block";
		
		document.getElementById("intromode_subtitle").style.display = "none";
		document.getElementById("setting_intromode").style.display = "none";
		
		document.getElementById("introshare_subtitle").style.display = "none";
		document.getElementById("setting_introshare").style.display = "none";
		
		document.getElementById("forward").style.display = "none";
		
		flashair.Set_Setting_Mode_LoadImg();
	},
	Set_Setting_Mode_LoadImg  : function() { 
		var box = document.images["mode_image_name"];
		document.getElementById("mode_image_id").width = 160;
		document.getElementById("mode_image_id").height = 120;
		
		box.onload = function(){
			flashair.Check_Setting_Mode_CISize();
			
			if( cipath ){
				if( flashair.RetryCount < 3 ){
					var index = cipath.lastIndexOf("/",cipath.length);
					cipath_name_pos = 0;
//					flashair.cipath_cut = cipath.substring( cipath_name_pos, cipath_name_pos + flashair.CIPATH_DISP_LENGTH );
					flashair.cipath_cut = cipath;
				}
				else{
					document.getElementById("mode_image_id").style.display = "none";
					document.getElementById("no_img_id").style.display = "block";
					flashair.cipath_cut = flashair.Set_Lang("Set_Mode_Lang_18");
				}
			}
			else{
				document.getElementById("mode_image_id").style.display = "none";
				document.getElementById("no_img_id").style.display = "block";
				flashair.cipath_cut = flashair.Set_Lang("Set_Mode_Lang_18");
			}
			
			flashair.RetryCount = 0;
			document.getElementById("mode_file_id").innerHTML = flashair.cipath_cut;
			
			if( ( appmode == '4' ) || ( appmode == '6' ) ){
				func_scroll_cipath_timer = 0;
				flashair.Set_Setting_Mode_Auto();
			}
			else if( ( appmode == '0' ) || ( appmode == '3' ) ){
				flashair.Set_Setting_Mode_Manual();
			}
			else{
				func_scroll_cipath_timer = 0;
				flashair.Set_Setting_Mode_Auto();
			}
		};
		box.onerror = function(){
			if( ( now_b == "IE" ) || ( now_b == "IE8" ) || ( now_b == "IE7" ) || ( now_b == "IE6" ) ){
				document.getElementById("mode_image_id").style.display = "none";
				box.src = "/~/other.png";	/* dummy */
				flashair.RetryCount = 3;
				document.getElementById("no_img_id").style.display = "block";
			}
			else{
				if( flashair.RetryCount < 3 ){
					flashair.RetryCount ++;
					setTimeout( "flashair.Set_Setting_Mode_LoadImg()", 200 );
				}
				else{
					document.getElementById("mode_image_id").style.display = "none";
					box.src = "/~/other.png";	/* dummy */
					
					document.getElementById("no_img_id").style.display = "block";
				}
			}
		};
		
		if( cipath ){
			document.getElementById("mode_image_id").style.display = "block";
			box.src= "/thumbnail.cgi?" + cipath;
			
			document.getElementById("no_img_id").style.display = "none";
		}
		else{
			document.getElementById("mode_image_id").style.display = "none";
			box.src = "/~/other.png";	/* dummy */
			
			document.getElementById("no_img_id").style.display = "block";
		}
	},
	Set_Setting_Mode_Back : function(){
		if( intro_mode_flag == "1" ){
			flashair.Set_Setting_Root();
		}
		else {
			flashair.Set_Setting_IntroMode();
		}
	},
	Set_Setting_IntroMode : function(){
		var l_addr = "IntroMode";
		sessionStorage.setItem( "local_setting_addr", l_addr );
		
		if( intro_mode_flag == "1" ){
			flashair.Set_Setting_Mode();
		}
		else{
			document.getElementById("root_subtitle").style.display = "none";
			
			document.getElementById("root_version").style.display = "none";
			document.getElementById("root_help").style.display = "none";
			document.getElementById("setting_root").style.display = "none";
			
			document.getElementById("wifi_subtitle").style.display = "none";
			document.getElementById("setting_wifi").style.display = "none";
			
			document.getElementById("mode_subtitle").style.display = "none";
			document.getElementById("mode_help").style.display = "none";
			document.getElementById("setting_mode").style.display = "none";
			
			document.getElementById("intromode_subtitle").style.display = "block";
			document.getElementById("setting_intromode").style.display = "block";
			
			document.getElementById("introshare_subtitle").style.display = "none";
			document.getElementById("setting_introshare").style.display = "none";
			
			document.getElementById("intromode_checkbox").style.display = "block";
			
			document.getElementById("forward").style.display = "block";
		}
	},
	Set_Setting_IntroMode_Force : function(){
		var l_addr = "IntroMode";
		sessionStorage.setItem( "local_setting_addr", l_addr );
		
		sessionStorage.setItem("help_mode_flag", "1");
		document.getElementById("root_subtitle").style.display = "none";
		
		document.getElementById("root_version").style.display = "none";
		document.getElementById("root_help").style.display = "none";
		document.getElementById("setting_root").style.display = "none";
		
		document.getElementById("wifi_subtitle").style.display = "none";
		document.getElementById("setting_wifi").style.display = "none";
		
		document.getElementById("mode_subtitle").style.display = "none";
		document.getElementById("mode_help").style.display = "none";
		document.getElementById("setting_mode").style.display = "none";
		
		document.getElementById("intromode_subtitle").style.display = "block";
		document.getElementById("setting_intromode").style.display = "block";
		
		document.getElementById("intromode_checkbox").style.display = "none";
		
		document.getElementById("introshare_subtitle").style.display = "none";
		document.getElementById("setting_introshare").style.display = "none";
		
		document.getElementById("forward").style.display = "none";
	},
	Set_Setting_IntroMode_Back : function(){
		var flag = sessionStorage.getItem("help_mode_flag");
		flashair.Set_Setting_IntroMode_flag();
		
		if(flag == "1"){
			sessionStorage.removeItem("help_mode_flag");
			flashair.Set_Setting_Mode();
		}else{
			flashair.Set_Setting_Root();
		}
	},
	Set_Setting_IntroMode_flag : function(){
		var mastercode_flag;
		var dd = new Date();
		httpObj = new XMLHttpRequest();
		var mastercode = sessionStorage.getItem("administrator");
		if(mastercode == null){
			mastercode_flag = "0";
			for( i = 0 ; i < 10 ; i ++ ){
				httpObj.open("GET",'/command.cgi?op=106&TIME='+dd.getTime(),false);
				httpObj.send(null);
				mastercode = httpObj.responseText;
				if( mastercode.length == 12 ){
					httpObj.open("GET",'/config.cgi?MASTERCODE='+mastercode+'&TIME='+dd.getTime(),false);
					httpObj.send(null);
					if( httpObj.responseText == 'SUCCESS' ){
						mastercode_flag = "1";
						break;
					}
				}
			}
			
			sessionStorage.setItem("administrator", mastercode);
			
			if( mastercode_flag == "0" ){
				window.alert( flashair.Set_Lang("Set_Set_Lang_6") );
				location.href = "/";
			}
		} else {
		}
		
		if( document.getElementById("intromode_check_id").checked == true ){
			intro_mode_flag = "1";
		}
		else{
			intro_mode_flag = "0";
		}
		
		app_info_str = app_info_str.charAt(0) + intro_mode_flag + app_info_str.slice(2);
		httpObj.open( "GET", '/config.cgi?MASTERCODE='+mastercode+'&APPINFO='+app_info_str+'&TIME='+dd.getTime(), false );
		httpObj.send(null);
	},
	Set_Setting_IntroShare : function(){
		var l_addr = "IntroShare";
		sessionStorage.setItem( "local_setting_addr", l_addr );
		
		if( intro_share_flag == "1" ){
			location.href = "/~/phtshare.htm";
		}
		else{
			document.getElementById("root_subtitle").style.display = "none";
			
			document.getElementById("root_version").style.display = "none";
			document.getElementById("root_help").style.display = "none";
			document.getElementById("setting_root").style.display = "none";
			
			document.getElementById("wifi_subtitle").style.display = "none";
			document.getElementById("setting_wifi").style.display = "none";
			
			document.getElementById("mode_subtitle").style.display = "none";
			document.getElementById("mode_help").style.display = "none";
			document.getElementById("setting_mode").style.display = "none";
			
			document.getElementById("intromode_subtitle").style.display = "none";
			document.getElementById("setting_intromode").style.display = "none";
			
			document.getElementById("introshare_subtitle").style.display = "block";
			document.getElementById("setting_introshare").style.display = "block";
			
			document.getElementById("introshare_checkbox").style.display = "block";
			
			document.getElementById("forward").style.display = "block";
		}
	},
	Set_Setting_IntroShare_Force : function(){
		var l_addr = "IntroShare";
		sessionStorage.setItem( "local_setting_addr", l_addr );
		
		document.getElementById("root_subtitle").style.display = "none";
		
		document.getElementById("root_version").style.display = "none";
		document.getElementById("root_help").style.display = "none";
		document.getElementById("setting_root").style.display = "none";
		
		document.getElementById("wifi_subtitle").style.display = "none";
		document.getElementById("setting_wifi").style.display = "none";
		
		document.getElementById("mode_subtitle").style.display = "none";
		document.getElementById("mode_help").style.display = "none";
		document.getElementById("setting_mode").style.display = "none";
		
		document.getElementById("intromode_subtitle").style.display = "none";
		document.getElementById("setting_intromode").style.display = "none";
		
		document.getElementById("introshare_subtitle").style.display = "block";
		document.getElementById("setting_introshare").style.display = "block";
		
		document.getElementById("introshare_checkbox").style.display = "none";
		
		document.getElementById("forward").style.display = "none";
	},
	Set_Setting_IntroShare_Back : function(){
		var flag = sessionStorage.getItem("help_share_flag");
		
		flashair.Set_Setting_IntroShare_flag();
		
		if( flag == "1" ){
			sessionStorage.removeItem("help_share_flag");
			flashair.Set_Setting_Mode_PhotoShare();
		}
		else{
			flashair.Set_Setting_Root();
		}
	},
	Set_Setting_IntroShare_flag : function(){
		var mastercode_flag;
		var dd = new Date();
		httpObj = new XMLHttpRequest();
		var mastercode = sessionStorage.getItem("administrator");
		if(mastercode == null){
			mastercode_flag = "0";
			for( i = 0 ; i < 10 ; i ++ ){
				httpObj.open("GET",'/command.cgi?op=106&TIME='+dd.getTime(),false);
				httpObj.send(null);
				mastercode = httpObj.responseText;
				if( mastercode.length == 12 ){
					httpObj.open("GET",'/config.cgi?MASTERCODE='+mastercode+'&TIME='+dd.getTime(),false);
					httpObj.send(null);
					if( httpObj.responseText == 'SUCCESS' ){
						mastercode_flag = "1";
						break;
					}
				}
			}
			
			sessionStorage.setItem("administrator", mastercode);
			
			if( mastercode_flag == "0" ){
				window.alert( flashair.Set_Lang("Set_Set_Lang_6") );
				location.href = "/";
			}
		} else {
		}
		
		if( document.getElementById("introshare_check_id").checked == true ){
			intro_share_flag = "1";
		}
		else{
			intro_share_flag = "0";
		}
		
		app_info_str = intro_share_flag + app_info_str.slice(1);
		httpObj.open( "GET", '/config.cgi?MASTERCODE='+mastercode+'&APPINFO='+app_info_str+'&TIME='+dd.getTime(), false );
		httpObj.send(null);
	},
	Init_List_Body : function(){
		var header;
		var f_name;
		var box_change_b;
		var bw = document.documentElement.clientWidth;
		var dd = new Date();
		
		now_href = location.pathname;
		
		box_type = sessionStorage.getItem("box_type");
		
		if( box_type == "box_tile" ){
			
		}
		else if( box_type == "box_list" ){
			
		}
		else{
			box_type = "box_tile";
			sessionStorage.setItem("box_type", "box_tile");
		}
		
		httpObj = new XMLHttpRequest();
		mcode = sessionStorage.getItem("administrator");
		if(mcode == null){
			for( i = 0 ; i < 10 ; i ++ ){
				httpObj.open("GET",'/command.cgi?op=106&TIME='+dd.getTime(),false);
				httpObj.send(null);
				mcode = httpObj.responseText;
				if( mcode.length == 12 ){
					httpObj.open("GET",'/config.cgi?MASTERCODE='+mcode+'&TIME='+dd.getTime(),false);
					httpObj.send(null);
					if( httpObj.responseText == 'SUCCESS'){
						break;
					}
				}
			}
			
			sessionStorage.setItem("administrator", mcode);
		} else {
			httpObj.open("GET",'/config.cgi?MASTERCODE='+mcode+'&TIME='+dd.getTime(),false);
			httpObj.send(null);
		}
		if( httpObj.responseText == 'SUCCESS' ){
			httpObj.open("GET",'/command.cgi?op=202'+'&TIME='+dd.getTime(),false);
			httpObj.send(null);
			now_share_mode = httpObj.responseText;
			
			if( now_share_mode == 'SHAREMODE' ){
				
				header = document.getElementById("title_tb_1");
				header.innerHTML = "";
				header.style.width = "150px";
				
				var faheader = document.getElementById("title_tb_2");
				faheader.innerHTML = "";
				faheader.style.width = "0px";
				
				f_name = document.getElementById("f_name");
				f_name.className = "f_name_s";
			//	f_name.innerHTML = "";
				f_name.innerHTML = "<font size='4' id ='nsub_id' color='#0000E6' ><b>"+flashair.Set_Lang("Set_FileShare_Lang_0") +"</b></font>";
				f_name.style.width = bw - (60*3+50) + "px";
				
				box_change_b = document.getElementById("title_tb_4");
				if( box_type == "box_list" ){
					box_change_b.innerHTML = '<div id="box_change_b" class="box_change_t_b" onclick="flashair.Change_Box_Disply()"></div>';
				}
				else{
					box_change_b.innerHTML = '<div id="box_change_b" class="box_change_l_b" onclick="flashair.Change_Box_Disply()"></div>';
				}
				
				box_change_b.style.width = "50px";
				
				var none = document.getElementById("title_tb_5");
				none.innerHTML = "";
				none.style.width = "0px";
			}
			else {
				if( now_href == "/" ){
					header = document.getElementById("title_tb_1");
					header.innerHTML = '<div class="header"></div>';
					header.style.width = "150px";
					
					var faheader = document.getElementById("title_tb_2");
					faheader.innerHTML = "";
					faheader.style.width = "0px";
					
					f_name = document.getElementById("f_name");
					f_name.innerHTML = "";
					f_name.style.width = bw - (60*4+50) + "px";
				}
				else{
					var folder_back_b = document.getElementById("title_tb_1");
					folder_back_b.innerHTML = '<div class="folder_back_b" onclick="flashair.Back_Folder()"></div>';
					folder_back_b.style.width = "50px";
					
					var faheader = document.getElementById("title_tb_2");
					faheader.innerHTML = '<div class="faheader" onclick="flashair.Link_Root_Force()"></div>';
					faheader.style.width = "50px";
					
					f_name = document.getElementById("f_name");
					var addr = now_href.split("/");
					
					if( addr[addr.length-1] == "" ){
						f_name.innerHTML = decodeURIComponent(addr[addr.length-2]);
					}
					else{
						f_name.innerHTML = decodeURIComponent( addr[addr.length-1]);
					}
					
					f_name.style.width = bw - (60*3+50) + "px";
				}
				
				box_change_b = document.getElementById("title_tb_4");
				if( box_type == "box_list" ){
					box_change_b.innerHTML = '<div id="box_change_b" class="box_change_t_b" onclick="flashair.Change_Box_Disply()"></div>';
				}
				else{
					box_change_b.innerHTML = '<div id="box_change_b" class="box_change_l_b" onclick="flashair.Change_Box_Disply()"></div>';
				}
				
				box_change_b.style.width = "50px";
				
				var gear_b = document.getElementById("title_tb_5");
				gear_b.innerHTML = '<div class="gear_b" onclick="flashair.Link_Set()"></div>';
				gear_b.style.width = "50px";
			}
			
			m_mode = "ON";
		}
		else{
			if( now_href == "/" ){
				httpObj.open("GET",'/command.cgi?op=202'+'&TIME='+dd.getTime(),false);
				httpObj.send(null);
				now_share_mode = httpObj.responseText;
				
				if( now_share_mode == 'SHAREMODE' ){
					header = document.getElementById("title_tb_1");
					header.innerHTML = "";
					header.style.width = "150px";
					
					var faheader = document.getElementById("title_tb_2");
					faheader.innerHTML = "";
					faheader.style.width = "0px";
				}
				else{
					header = document.getElementById("title_tb_1");
					header.innerHTML = '<div class="header"></div>';
					header.style.width = "150px";
					
					var faheader = document.getElementById("title_tb_2");
					faheader.innerHTML = "";
					faheader.style.width = "0px";
				}
				f_name = document.getElementById("f_name");
				f_name.innerHTML = "";
				f_name.style.width = bw - (60*3+50) + "px";
			}
			else{
				var folder_back_b = document.getElementById("title_tb_1");
				folder_back_b.innerHTML = '<div class="folder_back_b" onclick="flashair.Back_Folder()"></div>';
				folder_back_b.style.width = "50px";
				
				var faheader = document.getElementById("title_tb_2");
				faheader.innerHTML = '<div class="faheader" onclick="flashair.Link_Root_Force()"></div>';
				faheader.style.width = "50px";
				
				f_name = document.getElementById("f_name");
				var addr = now_href.split("/");
				
				if( addr[addr.length-1] == "" ){
					f_name.innerHTML = decodeURIComponent(addr[addr.length-2]);
				}
				else{
					f_name.innerHTML = decodeURIComponent(addr[addr.length-1]);
				}
				
				f_name.style.width = bw - (60*3) + "px";
			}
			
			box_change_b = document.getElementById("title_tb_4");
			if( box_type == "box_list" ){
				box_change_b.innerHTML = '<div id="box_change_b" class="box_change_t_b" onclick="flashair.Change_Box_Disply()"></div>';
			}
			else{
				box_change_b.innerHTML = '<div id="box_change_b" class="box_change_l_b" onclick="flashair.Change_Box_Disply()"></div>';
			}
			
			box_change_b.style.width = "50px";
			
			var none = document.getElementById("title_tb_5");
			none.innerHTML = "";
			none.style.width = "0px";
			
			httpObj.open("GET",'/command.cgi?op=202'+'&TIME='+dd.getTime(),false);
			httpObj.send(null);
			now_share_mode = httpObj.responseText;
			
			if( now_share_mode == 'SHAREMODE' ){
				var f_name = document.getElementById("f_name");
				f_name.className = "f_name_s";
				f_name.innerHTML = "<font size='4' id ='nsub_id' color='#0000E6' ><b>"+flashair.Set_Lang("Set_List_Lang_2") +"</b></font>";
				f_name.style.width = bw - (60*3+50) + "px";
			}
			else {
				
			}
			
			m_mode = "OFF";
		}
		
		document.getElementById("img_button").style.width = bw + "px";
		document.getElementById("slideshowbar").style.width = bw + "px";
	},
	fileshareReset : function(){
		var dd = new Date();
		httpObj = new XMLHttpRequest();
		
		{
			var ret = window.confirm( flashair.Set_Lang("Set_List_Lang_5") );
			if( ret == false ){
				return;
			}
			document.getElementById("brset").style.display = "none";
			document.getElementById("sharessid").style.display = "none";
			document.getElementById("sharepass").style.display = "none";
			st = '<font color="red">';
			st += flashair.Set_Lang("Set_List_Lang_17");
			st += '<br>';
			st += flashair.Set_Lang("Set_List_Lang_18");
			st += '<br>';
			st += flashair.Set_Lang("Set_List_Lang_19");
			st += '</font>';
			document.getElementById("warning").innerHTML = st;
			
			httpObj.open("GET",'/command.cgi?op=201'+'&TIME='+dd.getTime(),false);
			httpObj.send(null);
			
			if( httpObj.responseText != 'OK'){
				window.confirm( flashair.Set_Lang("Set_List_Lang_7") );
				return;
			}
		}
		
		{
			var ssid = localStorage.getItem("ssid");
			var mastercode = localStorage.getItem("mastercode");
			var key = localStorage.getItem("key");
			var appmode = localStorage.getItem("appmode");
			
			if( ( appmode == '4' ) || ( appmode == '6' ) ){
				apptime = localStorage.getItem("apptime");
				httpObj.open("GET",'/config.cgi?MASTERCODE='+mastercode+'&APPSSID='+ssid+'&APPNETWORKKEY='+key+'&APPAUTOTIME='+apptime+'&APPMODE=' +appmode+ '&NOMODIFY=1'+'&TIME='+dd.getTime(),false);
			}
			else if( ( appmode == '0' ) || ( appmode == '3' ) ){
				httpObj.open("GET",'/config.cgi?MASTERCODE='+mastercode+'&APPSSID='+ssid+'&APPNETWORKKEY='+key+'&APPMODE=' +appmode+ '&NOMODIFY=1'+'&TIME='+dd.getTime(),false);
				httpObj.send(null);
				if( httpObj.responseText == 'SUCCESS'){
					httpObj.open( "GET", '/command.cgi?op=112'+'&TIME='+dd.getTime(), false );
				}
			}
			else{
				apptime = localStorage.getItem("apptime");
				httpObj.open("GET",'/config.cgi?MASTERCODE='+mastercode+'&APPSSID='+ssid+'&APPNETWORKKEY='+key+'&APPAUTOTIME='+apptime+'&APPMODE=' +appmode+ '&NOMODIFY=1'+'&TIME='+dd.getTime(),false);
			}
			
			httpObj.send(null);
			
			if( httpObj.responseText == 'SUCCESS'){
				window.alert( flashair.Set_Lang("Set_List_Lang_6") );
				sharecnt=0;
				sessionStorage.setItem("ssid_check_flag", "0");
			}
			else{
				window.alert( flashair.Set_Lang("Set_List_Lang_8") );
			}
			flashair.filesharechkssid();
		}
	},
	filesharechkssid : function(){
		var flag = sessionStorage.getItem("ssid_check_flag");
		if( flag == "1" ){
			var dd = new Date();
			var fssid = localStorage.getItem("ssid");
			httpObj = new XMLHttpRequest();
			httpObj.open("GET",'/command.cgi?op=104&TIME='+dd.getTime(),false);
			httpObj.send(null);
			if( httpObj.responseText == fssid ){
				location.href = "/";
				sharecnt = 0;
			}
			else{
				if( sharecnt < 300 ){
					setTimeout( "flashair.filesharechkssid()", 1000 );
					sharecnt++;
				}
			}
		}
		else{
			if( sharecnt < 300 ){
				setTimeout( "flashair.filesharechkssid()", 1000 );
				sharecnt ++;
				if( sharecnt==25 ){
					sessionStorage.setItem("ssid_check_flag", "1");
				}
			}

		}
	},
	Checkadministrator : function(){
		var mastercode_flag;
		var dd = new Date();
		httpObj = new XMLHttpRequest();
		mastercode = sessionStorage.getItem("administrator");
		if(mastercode == null){
			mastercode_flag = "0";
			for( i = 0 ; i < 10 ; i ++ ){
				httpObj.open("GET",'/command.cgi?op=106&TIME='+dd.getTime(),false);
				httpObj.send(null);
				mastercode = httpObj.responseText;
				if( mastercode.length == 12 ){
					httpObj.open("GET",'/config.cgi?MASTERCODE='+mastercode+'&TIME='+dd.getTime(),false);
					httpObj.send(null);
					if( httpObj.responseText == 'SUCCESS' ){
						mastercode_flag = "1";
						break;
					}
				}
			}
			
			sessionStorage.setItem("administrator", mastercode);
			
			if( mastercode_flag == "0" ){
				window.alert( flashair.Set_Lang("Set_Set_Lang_6") );
				location.href = "/";
			}
		} else {
			httpObj.open("GET",'/config.cgi?MASTERCODE='+mastercode+'&TIME='+dd.getTime(),false);
			httpObj.send(null);
			if(httpObj.responseText != 'SUCCESS' ){
				window.alert( flashair.Set_Lang("Set_Set_Lang_6") );
				location.href = "/";
			}
		}
	},
	Getlock : function(){
		var dd = new Date();
		httpObj = new XMLHttpRequest();
		httpObj.open("GET",'/command.cgi?op=115&TIME='+dd.getTime(),false);
		httpObj.send(null);
		return httpObj.responseText;
	}
}
