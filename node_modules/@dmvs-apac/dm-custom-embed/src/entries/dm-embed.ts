import DmPlayer from '../dm-player/dm-player';

const el: NodeListOf<HTMLDivElement> = document.querySelectorAll('.dm-player');

const dmEmbed = new DmPlayer(el);

