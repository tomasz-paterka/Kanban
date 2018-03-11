// KLASA KANBAN CARD
function Card(id, name, bootcamp_kanban_column_id) {
	var self = this;

	this.id = id;
	this.name = name || 'No name given';
	this.bootcamp_kanban_column_id = bootcamp_kanban_column_id;
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardChangeName = $('<button class="change-card">Change Card Name</button>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');

		cardDeleteBtn.click(function() {
			self.removeCard();
		});

		cardChangeName.click(function(event) {
			var newCardName = prompt('Enter new name of the card');
			event.preventDefault();
			$.ajax({
				url: baseUrl + '/card/' + self.id,
				method: 'PUT',
				data: {
					name: newCardName,
					bootcamp_kanban_column_id: self.bootcamp_kanban_column_id
				},
				success: function (response) {
					self.element.children('p').html(newCardName);
				}
			});
		});

		card.append(cardChangeName);
		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription)
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function () {
				self.element.remove();
			}
		});
	}
}