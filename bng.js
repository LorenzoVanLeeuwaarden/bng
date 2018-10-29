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

	$('button').on('click', {}, () => {
		// which gender was selected ?
		let gender = $("#male").prop('checked')
			? 'male'
			: $("#female").prop('checked')
				? 'female'
				: 'unisex';
		let firstName = getRandomNamePart(gender, 'first');
		let lastName = getRandomLastName();

		let fullName = firstName + ' ' + lastName;
		$('#bng').html(fullName);
	})
});