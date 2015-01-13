## Gros truc

# Develop the search engine on the post title.
# Maquette review (pubs, search engine).

## Serveur

Add route and controller to create User (app.js, user.js)
	Hash password before insertion in database.

Verify token when adding end deleting post !

## Front
	
	Test the article creational form
	Add grunt file with watch, less compilation, js uglify, jshint and cssmin.
	Use less file instead of css file.
	Edition des catégories --> boutton en face de chaque catégories 
	NginfiniteScroll à implémenter avec lazyload
	lien de la page contact
	Intégration page contact
	Afficher une catégorie que si elle comprend des articles
	Ajouter les réseaux sociaux dans la page article.jade

## En cours

	Page Ajouter un article --> récupérer les catégories pour choisir la catégorie de l'article ensuite


## Fait

.post . put et .delete --> catégories
Tester .put --> article (titre, image, catégorie, contenu)
Bouton de déconnection --> session.destroy : A faire --> refresh la page sur clic du bouton
Lien sur logo + titre numeractive
Stocker user dans un cookie
	--> module ngCookie : on set le cookie dans AuthService et on vérifie le cookie dans le controller home
Formulaire pour ajouter un article