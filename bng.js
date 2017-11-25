
$( document ).ready(function() {
	console.log('document ready!');

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
		.done(function() {
			console.log('loaded names!');
		})
		.fail(function() {
			console.log('failed loading names...');
		});

	// getRandomNamePart ('male', 'first')
	let getRandomNamePart = (gender, firstOrLast) => {
		console.log('getting ' + gender + ' ' + firstOrLast + ' random name part');
		let namePart = names[gender][firstOrLast];
		return namePart[Math.round(Math.random() * (namePart.length - 1))];
	};

	let copyName = (value) => {
		// Select some text (you could also create a range)
		let copyResult  = document.getElementById('copyResult');
		let textArea = document.createElement('textarea');

		//
		// *** This styling is an extra step which is likely not required. ***
		//
		// Why is it here? To ensure:
		// 1. the element is able to have focus and selection.
		// 2. if element was to flash render it has minimal visual impact.
		// 3. less flakyness with selection and copying which **might** occur if
		//    the textarea element is not visible.
		//
		// The likelihood is the element won't even render, not even a flash,
		// so some of these are just precautions. However in IE the element
		// is visible whilst the popup box asking the user for permission for
		// the web page to copy to the clipboard.
		//

		// Place in top-left corner of screen regardless of scroll position.
		textArea.style.position = 'fixed';
		textArea.style.top = 0;
		textArea.style.left = 0;

		// Ensure it has a small width and height. Setting to 1px / 1em
		// doesn't work as this gives a negative w/h on some browsers.
		textArea.style.width = '2em';
		textArea.style.height = '2em';

		// We don't need padding, reducing the size if it does flash render.
		textArea.style.padding = 0;

		// Clean up any borders.
		textArea.style.border = 'none';
		textArea.style.outline = 'none';
		textArea.style.boxShadow = 'none';

		// Avoid flash of white box if rendered for any reason.
		textArea.style.background = 'transparent';

		textArea.value = value;
		document.body.appendChild(textArea);
		textArea.select();

		// Use try & catch for unsupported browser
		try {
			// The important part (copy selected text)
			let ok = document.execCommand('copy');
			if (ok) copyResult.innerHTML = 'naam gekopieerd !';
			// else    copyResult.innerHTML = 'Unable to copy!';
		} catch (err) {
			// copyResult.innerHTML = 'Unsupported Browser!';
		}
	};

	$('button').on('click', {}, () => {
		let firstName = getRandomNamePart('male', 'first');
		let lastName = getRandomNamePart('male', 'last');

		let fullName = firstName + ' ' + lastName;
		$('#bng').html(fullName);
		copyName(fullName);
	})
});