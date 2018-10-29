$( document ).ready(function() {
	// setup
	$('input').iCheck({
		checkboxClass: 'icheckbox_flat',
		radioClass: 'iradio_flat'
	});

	// load names
	let names;

	$.get('names.json', function(theNames) {
		names = theNames;
	})
		.done(function() { console.log('loaded names!'); })
		.fail(function() { console.log('failed loading names...'); });

	let getRandomNamePart = (gender) => {
		let namePart = names[gender]['first'];
		return namePart[Math.round(Math.random() * (namePart.length - 1))];
	};

	let getRandomLastName = () => {
		let namePart = names['last'];
		return namePart[Math.round(Math.random() * (namePart.length - 1))];
	};

	let animateNewName = () => {
		// Wrap every letter in a span
		$('.ml6 .letters').each(function(){
			$(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
		});

		anime.timeline({loop: false})
		.add({
			targets: '.ml6 .letter',
			translateY: ["1.1em", 0],
			translateZ: 0,
			duration: 750,
			delay: function(el, i) {
				return 50 * i;
			}
		});
	};

	$('button').on('click', {}, () => {
		// which gender was selected ?
		let gender = $("#male").prop('checked')
			? 'male'
			: $("#female").prop('checked')
				? 'female'
				: 'unisex';
		let firstName = getRandomNamePart(gender, 'first');
		let lastName = getRandomLastName();

		// let fullName = firstName + ' ' + lastName;
		$('#wngFirst').html(firstName);
		$('#wngLast').html(lastName);
		animateNewName();
	});
});