
// jquery elements selection 
	var $header_top = $('.header-top');
	var $nav = $('nav');
	var $section_title = $('#section-title');
	var $design_overlay = $('#design-overlay');
	var $faq_overlay = $('#faq-overlay');
	var $question_display = $('#faq-answer-div-question');
	var $answer_display = $('#faq-answer-div-answer')
	var $answer_div = $('#faq-answer-div');
	
	//To track opened popups
	var menu_shown = false;
	var faq_answer_shown = false;
	
	//To track navigation links. For scroll based response on navigation links.
	var sections = $('section')
		, nav = $('nav')
		, header_height =  $header_top.outerHeight();

// FAQ Questions and its answers
//------------------------------
	var questionsArray = [
		"Do you provide participation certificates?",
		"How do I reach NIT Calicut?",
		"How do I register for the FOSSMeet '18?",
		"What is your refund policy?",
		"Is food provided during the event?",
		"Do we get T-shirts for FOSSMeet '18?",
		"Are there any separate fees for talks/workshops?",
		"Can I register for specific workshops/talks?",
		"Will accommodation be provided?",
		"Is it necessary for each participant to register?",
		"Will I get a confirmation mail after registration?"
	];
	var answersArray = [
		"Last year, we had a lot of students attending the event merely for the sake of getting certificates. We have decided that we will not be issuing participation certificates for this edition of FOSSMeet.",
		
		"NITC is well connected by railway, air and road facilities. All major stations in India have trains to Kozhikode Railway station(CLT). The Kozhikode International Airport(CCJ) provides daily flights to and from major cities in India.<br>"+
		"</br><b class=\"faq-answer-subtitle\">From Airport:</b></br>"+
		"Take a cab directly to NIT Calicut.</br>"+
		"</br><b class=\"faq-answer-subtitle\">From Railway Station:</b></br>"+
		"Take a cab directly to NIT Calicut or take a bus (towards Mukkam or REC/NIT) from Palayam bus stand, Kozhikode.",
		
		"Online registrations have already started in FOSSMeet.in. Spot registrations can also be availed*. The seats will be filled in the first come first served manner. Online registrations will be given preference over on-spot registrations. There are only a total of 150 seats available.",
		
		"Refund unless for genuine reasons will not be entertained. However, we will refund 50% of the amount paid, excluding service charges. To initiate a refund, send a mail to info@fossmeet.in and we will contact you.",
		
		"Yes, food will be provided. The registration fee is inclusive of dinner on Friday, breakfast, lunch and dinner on Saturday and, breakfast and lunch on Sunday.*",
		
		"Yes, all participants of FOSSMeet '18 get free T-shirts!* :)",
		
		"No separate fee for talks/workshops.",
		
		"No, you can't register for specific workshops/talks. There is no explicit registration fees for specific workshops/talks.",
		
		"Yes, different accomodation facilities will be provided for the students and the professionals from friday night till Sunday night, for the entire duration of FOSSMeet. Accomodation charges (for the entire FOSSMeet event)+:<br><br>"+
		"<ul class=\"faq-answer-sublist\"><b>"+
			"<li>Students: &#8377;50 - &#8377;100*</li>"+
			"<li>Professionals: &#8377;200 - &#8377;400*</li>"+
		"</b></ul>",
		
		"Yes, each participant has to register seperately in the website. This it to keep track of your workshop/talk preference, food preference and hostel accommodation.",
		
		"Yes, By February 15th, you will receive a confirmation mail from the FOSSMeet team."
	];

// Startup operations
	$header_top.find('.toggle-menu').on('click', toggleMenu);
	$('#collapse-nav').find('.nav-item').on('click', toggleMenu);
	for(i=0;i<questionsArray.length;i++){ //Filling faq questions list
		$('#faq-list').append("<li><a onclick=\"answerFaq("+i+")\" class=\"faq-question\">&#8226; "+questionsArray[i]+"</a></li>");
	}
	
//Current viewing section based response on navigation bar links.
	$(window).on('scroll', function () {
		var cur_pos = $(this).scrollTop();
	 
		sections.each(function() {
			var top = $(this).offset().top - header_height,
					bottom = top + $(this).outerHeight();
	 
			if (cur_pos >= top && cur_pos <= bottom) {
				nav.find('a').removeClass('active');
				sections.removeClass('active');
	 
				$(this).addClass('active');
				nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
			}
		});
	});
	//Click based response of navigation links. it basically triggers scroll based response wrote in previous block
	nav.find('a').on('click', function () {
		var $el = $(this)
			, id = $el.attr('href');
	 
		$('html, body').animate({
			scrollTop: $(id).offset().top - header_height/2
		}, 500);
	 
		return false;
	});
	
	//Closing nav when clicking outside nav 
	$(document).click(function(e) {
		if ($(e.target).is('#faq-overlay')) {
				console.log("Collapse now");
				if(menu_shown){ toggleMenu();}
				if(faq_answer_shown){ hideAnswer();}
			}
	});
	

// Function definitions using jquery 
	function toggleMenu() {
		$header_top.toggleClass('open-menu');
		$('#collapse-nav').slideToggle("fast");
		$('.header-nav-container').toggleClass('hide')
		if(faq_answer_shown){
			hideAnswer();
		}
		$faq_overlay.toggleClass('faq-overlay-dim');
		if(menu_shown){ menu_shown = false; } else {menu_shown = true;}
	}
	// Functions to toggle answer popup */
		function hideAnswer() {
			$answer_div.slideUp("fast");
			if(menu_shown == false)
			{
				if($faq_overlay.hasClass('faq-overlay-dim')){
					$faq_overlay.toggleClass('faq-overlay-dim');
				}
			}
			faq_answer_shown = false;
		}
		function showAnswer() {
			$answer_div.slideDown("fast");
			if(menu_shown == false)
				if($faq_overlay.hasClass('faq-overlay-dim') == false){
					$faq_overlay.toggleClass('faq-overlay-dim');
				}
			faq_answer_shown = true;
			console.log("OK");
		}
	// Function to set and display faq answers */
		function answerFaq(question){
				$answer_div.slideUp("fast", function(){
					$question_display.html("<a onclick=\"hideAnswer();\" style=\"cursor: pointer\"><i class=\"fa fa-window-close\" aria-hidden=\"true\" style=\"padding-right: 1em; font-size: 2rem\"></i></a>"+questionsArray[question]);
					$answer_display.html(answersArray[question]);			
				});
				showAnswer();
		}
		

	