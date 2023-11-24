import Route from '@ember/routing/route';

export default class BooksRoute extends Route {
    async model(){
        return this.store.findall('book');
    }
}
