## Gros truc

# Développer la fonctionalité de livesearch dans le site


## Serveur

Tester .put --> article (titre, image, catégorie, contenu)
.post . put et .delete --> catégories 
Hasher le mdp dans la BDD --> sur api/login --> récupérer le mot de passe et le dehasher
Add color field for categories to display their in menu side

/!\ --> .post article : vérifier Token

## Front

	Edition des catégories --> boutton en face de chaque catégories 
	NginfiniteScroll à implémenter
	lien de la page contact
	intégration page contact
	Afficher une catégorie que si elle comprend des articles
	Sur clic catégorie --> sur clic d'un article implémenter le lien vers la page article
	Ajouter les réseaux sociaux dans la page article.jade


## En cours

	Page Ajouter un article --> récupérer les catégories pour choisir la catégorie de l'article ensuite


## Fait

Bouton de déconnection --> session.destroy : A faire --> refresh la page sur clic du bouton

Lien sur logo + titre numeractive

Stocker user dans un cookie
	--> module ngCookie : on set le cookie dans AuthService et on vérifie le cookie dans le controller home

faire le formulaire pour ajouter un article