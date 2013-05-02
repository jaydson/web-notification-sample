(function () {

	var WebNotifier = function () {
		var quotes = [
			'A good programmer is someone who looks both ways before crossing a one-way street, Doug Linder, systems administrator ',
			'A most important, but also most elusive, aspect of any tool is its influence on the habits of those who train themselves in its use. If the tool is a programming language this influence is, whether we like it or not, an influence on our thinking habits. -- Edsger Dijkstra, computer scientist',
			'Being abstract is something profoundly different from being vague... The purpose of abstraction is not to be vague, but to create a new semantic level in which one can be absolutely precise.   -- Edsger Dijkstra ',
			'Besides a mathematical inclination, an exceptionally good mastery of ones native tongue is the most vital asset of a competent programmer.   -- Edsger Dijkstra ',
			'C makes it easy to shoot yourself in the foot; C++ makes it harder, but when you do, it blows away your whole leg.   -- Bjarne Stroustrup, developer of the C++ programming language ',
			'Commentary: most debugging problems are fixed easily; identifying the location of the problem is hard.   -- unknown ',
			'Considering the current sad state of our computer programs, software development is clearly still a black art, and cannot yet be called an engineering discipline.   -- Bill Clinton, former President of the United States',
			'For a long time it puzzled me how something so expensive, so leading edge, could be so useless, and then it occurred to me that a computer is a stupid machine with the ability to do incredibly smart things, while computer programmers are smart people with the ability to do incredibly stupid things. They are, in short, a perfect match.   -- Bill Bryson, author, from Notes from a Big Country',
			'Given enough eyeballs, all bugs are shallow (e.g., given a large enough beta-tester and co-developer base, almost every problem will be characterized quickly and the fix obvious to someone).   -- Eric S. Raymond, programmer and advocate of open source software, from The Cathedral and the Bazaar',
			'Good code is its own best documentation. As youre about to add a comment, ask yourself, How can I improve the code so that this comment isnt needed? Improve the code and then document it to make it even clearer.   -- Steve McConnell, software engineer and author, from Code Complete',
			'Hey! It compiles! Ship it!   -- unknown ',
			'Inside every well-written large program is a well-written small program.   -- Charles Antony Richard Hoare, computer scientist ',
			'It should be noted that no ethically-trained software engineer would ever consent to write a DestroyBaghdad procedure. Basic professional ethics would instead require him to write a DestroyCity procedure, to which Baghdad could be given as a parameter.   -- Nathaniel S. Borenstein, computer scientist ',
			'Managing programmers is like herding cats.   -- unknown ',
			'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.   -- Bill Gates, co-founder of Microsoft Corporation ',
			'More good code has been written in languages denounced as bad than in languages proclaimed wonderful -- much more.   -- Bjarne Stroustrup, from The Design and Evolution of C++',
			'Programs must be written for people to read, and only incidentally for machines to execute.   -- Harold Abelson and Gerald Jay Sussman, computer scientists and authors, from The Structure and Interpretation of Computer Programs',
			'Real programmers dont comment their code. If it was hard to write, it should be hard to understand.   -- unknown',
			'Simplicity is prerequisite for reliability.   -- Edsger Dijkstra ',
			'The C programming language -- a language which combines the flexibility of assembly language with the power of assembly language.   -- unknown ',
			'The first 90% of the code accounts for the first 90% of the development time. The remaining 10% of the code accounts for the other 90% of the development time.   -- Tom Cargill, object-oriented programming expert at Bell Labs',
			'The key to performance is elegance, not battalions of special cases. The terrible temptation to tweak should be resisted unless the payoff is really noticeable.   -- Jon Bently and M. Douglas McIlroy, both computer scientists at Bell Labs ',
			'The last good thing written in C was Franz Schuberts Symphony Number 9.   -- Erwin Dieterich, programmer ',
			'The problem with using C++ ... is that theres already a strong tendency in the language to require you to know everything before you can do anything.   -- Larry Wall, developer of the Perl language ',
			'The sooner you start to code, the longer the program will take.   -- Roy Carlson, University of Wisconsin ',
			'The value of a prototype is in the education it gives you, not in the code itself.   -- Alan Cooper, software author, from The Inmates are Running the Asylum',
			'There are only two kinds of programming languages: those people always bitch about and those nobody uses.   -- Bjarne Stroustrup ',
			'There are two ways of constructing a software design. One way is to make it so simple that there are obviously no deficiencies. And the other way is to make it so complicated that there are no obvious deficiencies.   -- Charles Antony Richard Hoare ',
			'Ugly programs are like ugly suspension bridges: they are much more liable to collapse than pretty ones, because the way humans (especially engineer-humans) perceive beauty is intimately related to our ability to process and understand complexity. A language that makes it hard to write elegant code makes it hard to write good code.   -- Eric S. Raymond ',
			'Weeks of programming can save you hours of planning.   -- unknown ',
			'When a programming language is created that allows programmers to program in simple English, it will be discovered that programmers cannot speak English.   -- unknown ',
			'Java is to JavaScript what Car is to Carpet. -- Chris Heilmann'
		],
		intervalId = null;

		this.status = null;
		this.interval = 1000 * 10;

		this.getRamdomQuote = function () {
			return quotes[Math.floor(Math.random() * quotes.length)];
		};

		this.authorize = function () {
			var notifier = this;
			window.Notification.requestPermission(function(perm) {				
		        notifier.status = perm;
		        notifier.start();
		    });
		};

		this.notify = function (quote) {
			var notification = new Notification("Programming quote :) ", {
		        dir: "auto",
		        lang: "",
		        icon: "icon.png",
		        Duration : 10,
		        body: quote,
		        tag: "sometag",
		    });
		    notification.onshow = function() {
		    	setTimeout(function () {		    		
		    		notification.close();
		    	}, 10000); 
		    };
		};

		this.addEvents = function () {
			var notifier = this;
			document.querySelector('#auth').addEventListener('click', function () {
				notifier.authorize();
			});
		};

		this.isAuth = function () {
			return this.status === 'granted' || 
					Notification.permission === 'granted' ||
					window.webkitNotifications.checkPermission() === 0;
		};

		this.start = function () {
			var notifier = this,
				statusElem = document.querySelector('#statusvalue');

			/* Is authorized ? */
			if (this.isAuth()) {
				intervalId = window.setInterval(function () {
					/* Start */	
					var quote = notifier.getRamdomQuote();
					notifier.notify(quote);
				}, notifier.interval);

				statusElem.setAttribute('class','started');
				statusElem.innerHTML = 'Started';
			}
		};

		this.init = function () {
			this.addEvents();
			this.authorize();
			this.start();			
		};
	};


	var webnotifier = new WebNotifier();
	webnotifier.init();

}());