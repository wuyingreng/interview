import WelcomeItem from '../WelcomeItem.vue'
import DocumentationIcon from '../icons/IconDocumentation.vue'
import ToolingIcon from '../icons/IconTooling.vue'
import EcosystemIcon from '../icons/IconEcosystem.vue'
import CommunityIcon from '../icons/IconCommunity.vue'
import SupportIcon from '../icons/IconSupport.vue'

export const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')

export { WelcomeItem, DocumentationIcon, ToolingIcon, EcosystemIcon, CommunityIcon, SupportIcon }
