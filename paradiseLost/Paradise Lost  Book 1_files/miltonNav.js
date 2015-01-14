				// Written by Graeson McMahon - 8/23/14
				
				$(document).ready(function() {
					if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
						$("#header").css("background-attachment", "scroll");
						$("#headerPL").css("background-attachment", "scroll");
						$("#headerPR").css("background-attachment", "scroll");
						
						$("#headerSamson").css("background-attachment", "scroll");
					}
					
					var sidebarStopped = false;
					var minHeightSet = false;
					
					if ($("#container").height() - 200 < $("#sidebar").height()) {
						minHeightSet = true;
						$("#container").css("min-height", $("#sidebar").height());
						$("#home").css("top", "2%");
						$("#home").css("position", "absolute");
					}
					
					
					
					$(window).scroll(function(evt){			
						if (!minHeightSet) {
							
							if ($(window).scrollTop() > $("#sidebar").offset().top && $("#sidebar").height() < $(window).height() - 50) {
								$("#sidebar").css("position", "fixed");
								$("#sidebar").css("top", "0%");
						
							}
							
							else if ($(window).scrollTop() < $("#container").offset().top) {
								$("#sidebar").css("position", "absolute");
								$("#sidebar").css("top", $("#container").offset().top);
							
							}
							
							
							if (sidebarStopped && $(window).scrollTop() <= $("#content").offset().top + $("#content").height() - $("#sidebar").height()) {
								$("#home").css("position", "fixed");
								$("#home").css("top", "2%");
								$("#sidebar").css("position", "fixed");
								$("#sidebar").css("top", "0%");
								sidebarStopped = false;
								
								if ($("#sidebar").offset().top < $("#container").offset().top) {
									$("#sidebar").css("position", "absolute");
									$("#sidebar").css("top", $("#container").offset().top);
								}
							}						
							else if ($("#sidebar").offset().top + $("#sidebar").height() > $("#content").offset().top + $("#content").height()) {
									$("#sidebar").css("top", $("#content").offset().top + $("#content").height() - $("#sidebar").height());
									$("#sidebar").css("position", "absolute");
									sidebarStopped = true;
									
									$("#home").css("top", $("#sidebar").offset().top + 20);
									$("#home").css("position", "absolute");
							}
						}
						
					});
					
					
					$("#search").click(function(evt) {
						evt.preventDefault();
						$("#searchBar").fadeToggle();
					});
					
					
					var lastTarget = null;
					var slidOver = false;
					
					//$("#annotation").css("height", $("#content").css("height"));
				
					$(".annotBtn").click(function(evt) { 
						var id = $(evt.target).closest("a").attr("id");
						var annot;
						
						if (lastTarget != null) {
							$(lastTarget).closest(".annotBtn").css("background-color", "white");
						}
						
						$(evt.target).closest(".annotBtn").css("background-color", "#DDDDDD");
						
						if ($(lastTarget).closest(".annotBtn")[0] != $(evt.target).closest(".annotBtn")[0]) {
							var location = $(evt.target).offset().top - $(window).scrollTop();
							
							$("#content").css("width", "65%");
							$("#container").css("margin-right", "5%");
							
							
							if ($("#content").attr("class") == "lengthyWork") {
								
								if (!slidOver) {
									$(window).scrollTop($(evt.target).offset().top - location);
								}
							}
							
							annot = $("#annotation").empty().append(annotList[id]);
							slidOver = true;
							lastTarget = evt.target;
						}
						else {
							var location = $(evt.target).offset().top - $(window).scrollTop();
							
							$("#content").css("width", "100%");
							$("#container").css("margin-right", "14%");

							annot = $("#annotation").empty();
							
							if ($("#content").attr("class") == "lengthyWork") {							
								$(window).scrollTop($(evt.target).offset().top - location);
							}
													
							
							//$(evt.target).closest(".annotBtn").css("background-color", "white");
							lastTarget = null;
							slidOver = false;
						}
						
						
						
						if ($("#content").css("display") == "none") {
							if ($(evt.target).closest("#alternateContent").length != 0) {
								$(".annotation").offset({top:$(this).offset().top}); 
							}
							else {
								$(".annotation").offset({top:$("#alternateContent").offset().top});
							}
						
						}
						else {
							if ($(evt.target).closest("#content").length != 0) {
								$(".annotation").offset({top:$(this).offset().top}); 
							}
							else {
								$(".annotation").offset({top:$("#content").offset().top});
							}
						
						}
								
						evt.preventDefault();
					});//end click
					
					
					
					
					
					
					window.onresize = function() {
						$("#copyrightFooter").css("font-size", "1.0em")
						$("#header").css("font-size", "1.0em");
						$("#headerPL").css("font-size", "1.0em");
						$("#headerPR").css("font-size", "1.0em");
						$("#headerSamson").css("font-size", "1.0em");
						
						$("#sidebar").css("font-size", "1.0em");
						
						while ($(".firstWord1").offset().top != $(".secondWord1").offset().top || 
							$(".firstWord2").offset().top != $(".secondWord2").offset().top) {
							
							var fontSize = parseFloat($("#copyrightFooter").css("font-size")) - 2;
							$("#copyrightFooter").css("font-size", fontSize);
						}
						
						var fontSize = parseFloat($("#headerPL").css("font-size")) - 2;
						
						while (fontSize && $(".headerFix1").height() != $(".headerFix2").height())  {
						
							$("#headerPL").css("font-size", fontSize);
							fontSize = parseFloat($("#headerPL").css("font-size")) - 2;
						}
						fontSize = parseFloat($("#header").css("font-size")) - 2;
						while (fontSize && $(".headerFix1").height() != $(".headerFix2").height())  {
							$("#header").css("font-size", fontSize);
							fontSize = parseFloat($("#header").css("font-size")) - 2;
						}
						
						fontSize = parseFloat($("#headerPR").css("font-size")) - 2;
						while (fontSize && $(".headerFix1").height() != $(".headerFix2").height())  {
							$("#headerPR").css("font-size", fontSize);
							fontSize = parseFloat($("#headerPR").css("font-size")) - 2;
						}
						fontSize = parseFloat($("#headerSamson").css("font-size")) - 2;
						while (fontSize &&$(".headerFix1").height() != $(".headerFix2").height())  {
							$("#headerSamson").css("font-size", fontSize);
							fontSize = parseFloat($("#headerSamson").css("font-size")) - 2;
						}
						
						
						if (lastTarget == null) {
							$("#container").css("margin-left", "14%");
							$("#container").css("margin-right", "14%");
							$("#content").css("width", "100%");
							
						}
						else {
							$("#container").css("margin-left", "14%");
							$("#container").css("margin-right", "5%");
							$("#content").css("width", "65%");
							
						}
						
						$("#sidebar").css("position", "absolute");
						$("#sidebar").css("top", $("#container").offset().top);
						
						if (!minHeightSet) {
							if ($(window).scrollTop() > $("#sidebar").offset().top) {
								$("#sidebar").css("position", "fixed");
								$("#sidebar").css("top", "0%");
								
							}
							
							else if ($(window).scrollTop() < $("#container").offset().top) {
							
								$("#sidebar").css("position", "absolute");
								$("#sidebar").css("top", $("#container").offset().top);
							}
							
							if (sidebarStopped && $(window).scrollTop() < $("#content").offset().top + $("#content").height() - $("#sidebar").height()) {
									$("#home").css("position", "fixed");
									$("#home").css("top", "3%");
									$("#sidebar").css("position", "fixed");
									$("#sidebar").css("top", "0%");
									sidebarStopped = false;
									
									if ($("#sidebar").offset().top < $("#container").offset().top) {
										$("#sidebar").css("position", "absolute");
										$("#sidebar").css("top", $("#container").offset().top);
									}
									
								}						
							else if ($("#sidebar").offset().top + $("#sidebar").height() > $("#content").offset().top + $("#content").height()) {
										$("#home").css("top", $("#home").offset().top);
										$("#home").css("position", "absolute");
									
										$("#sidebar").css("top", $("#content").offset().top + $("#content").height() - $("#sidebar").height());
										$("#sidebar").css("position", "absolute");
										sidebarStopped = true;
							}
						}
					};		
					
				
					
					if (window.screen.availWidth < 1000) {
						$("#container").css("font-size", ".8em");
					}
					
				
					
					
					
					while ($(".firstWord1").offset().top != $(".secondWord1").offset().top || 
							$(".firstWord2").offset().top != $(".secondWord2").offset().top) {
							var fontSize = parseFloat($("#copyrightFooter").css("font-size")) - 2;
							$("#copyrightFooter").css("font-size", fontSize);
					}
					var fontSize = parseFloat($("#header").css("font-size")) - 2;
						while (fontSize && $(".headerFix1").outerHeight() != $(".headerFix2").height())  {
							$("#header").css("font-size", fontSize);
							var fontSize = parseFloat($("#header").css("font-size")) - 2;
						}
						fontSize = parseFloat($("#headerPL").css("font-size")) - 2;
						while (fontSize && $(".headerFix1").outerHeight() != $(".headerFix2").height())  {
							$("#headerPL").css("font-size", fontSize);
							var fontSize = parseFloat($("#headerPL").css("font-size")) - 2;
						}
						fontSize = parseFloat($("#headerPR").css("font-size")) - 2;
						while (fontSize && $(".headerFix1").outerHeight() != $(".headerFix2").height())  {
							$("#headerPR").css("font-size", fontSize);
							var fontSize = parseFloat($("#headerPR").css("font-size")) - 2;
						}
						fontSize = parseFloat($("#headerSamson").css("font-size")) - 2;
						while (fontSize &&$(".headerFix1").outerHeight() != $(".headerFix2").height())  {
							$("#headerSamson").css("font-size", fontSize);
							var fontSize = parseFloat($("#headerSamson").css("font-size")) - 2;
						}
					while($("#sidebar").outerHeight() > $(window).height()) {
						var fontSize = parseFloat($("#sidebar").css("font-size")) - 2;
						$("#sidebar").css("font-size", fontSize);
					}
					
				});//end function