class BFS {
    constructor() {}

    is_valid_index(index, board_size) {
        return index >= 0 && index < board_size;
    }
    is_valid_neighbor(index, board_size, visited) {
        return this.is_valid_index(index, board_size) && !visited.has(index);
    }
    get_neighbors(index, board_size, visited) {
        neighbors = new Set();
        let cardinal = [-1, 1, -board_size, board_size];
        let diagonal = [
            -board_size - 1,
            -board_size + 1,
            board_size - 1,
            board_size + 1,
        ];

        for (let i of cardinal) {
            if (this.is_valid_neighbor(index + i, board_size, visited)) {
                neighbors.add(index + i);
            }
        }
        for (let i of this.diagonal) {
            if (this.is_valid_neighbor(index + i, board_size, visited)) {
                neighbors.add(index + i);
            }
        }
        return neighbors;
    }
    search(board, word) {
        let board_size = Math.sqrt(board.length);
        let visited = new Set();
        let neighbors = new Set();
        let start = new Set();
        let letter_pos = new Set();

        let response;

        //find the indecies of the first letter
        for (let i = 0; i < board.length; i++) {
            if (board[i] === word[0]) {
                start.add(i);
            }
        }
        if (letter_pos.size === 0) {
            return false;
        }

        for (let i of start) {
            visited.clear();
            neighbors.clear();
            letter_pos.clear();
            visited.add(i);
            letter_pos.add(i);
            neighbors = this.get_neighbors(i, board_size, visited);
            for (let j = 1; j < word.length; j++) {
                for (let n of neighbors) {
                    if (board[n] === word[j]) {
                        visited.add(n);
                        letter_pos.add(n);
                        neighbors = this.get_neighbors(n, board_size, visited);
                        break;
                    }
                }
            }
        }
        if (letter_pos.size === word.length) {
            response = {
                found: true,
                path: letter_pos,
            };
        }
        return response;
    }
}
