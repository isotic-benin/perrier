/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/PERO/Documents/fortune/pero/commerce/src';

const iconMap = {
    ChevronRight: 'FaChevronRight',
    ChevronLeft: 'FaChevronLeft',
    ChevronDown: 'FaChevronDown',
    Menu: 'FaBars',
    Search: 'FaMagnifyingGlass',
    ShoppingCart: 'FaCartShopping',
    User: 'FaUser',
    X: 'FaXmark',
    Globe: 'FaGlobe',
    Mail: 'FaEnvelope',
    MapPin: 'FaLocationDot',
    MessageCircle: 'FaMessage',
    Phone: 'FaPhone',
    Loader2: 'FaSpinner',
    CheckCircle: 'FaCircleCheck',
    CheckCircle2: 'FaCircleCheck',
    LogOut: 'FaArrowRightFromBracket',
    Minus: 'FaMinus',
    Plus: 'FaPlus',
    Star: 'FaStar',
    Heart: 'FaHeart',
    SlidersHorizontal: 'FaSliders',
    ArrowRight: 'FaArrowRight',
    ArrowLeft: 'FaArrowLeft',
    Trash2: 'FaTrashCan',
    ShoppingBag: 'FaBagShopping',
    ShieldCheck: 'FaShieldHalved',
    Truck: 'FaTruck',
    Users: 'FaUserGroup',
    CreditCard: 'FaCreditCard',
    Landmark: 'FaBuildingColumns',
    TreePine: 'FaTree',
    Check: 'FaCheck',
    Pencil: 'FaPenToSquare',
    ShieldOff: 'FaShield',
    Circle: 'FaRegCircle',
    Package: 'FaBox',
    Upload: 'FaUpload',
    XCircle: 'FaCircleXmark',
    RefreshCcw: 'FaArrowsRotate',
    Home: 'FaHouse',
    FolderTree: 'FaFolderTree',
    HelpCircle: 'FaCircleQuestion',
    ImageIcon: 'FaImage',
    Image: 'FaImage',
    LayoutDashboard: 'FaTableColumns',
    MessageSquare: 'FaMessage',
    Ticket: 'FaTicket',
    AlertTriangle: 'FaTriangleExclamation',
    Banknote: 'FaMoneyBill',
    Headset: 'FaHeadset',
    RotateCcw: 'FaArrowRotateLeft',
    Leaf: 'FaLeaf',
    Flame: 'FaFire'
};

function fixAll() {
    function traverseDirs(currentDir) {
        const files = fs.readdirSync(currentDir);
        for (const file of files) {
            const fullPath = path.join(currentDir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                traverseDirs(fullPath);
            } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
                let content = fs.readFileSync(fullPath, 'utf8');

                // 1. Restore missing Core React/Next imports ONLY if used in file and missing
                const importsToAdd = {
                    'react': [],
                    'next/navigation': [],
                    'next/link': [],
                    'next': []
                };

                const coreReact = ['useState', 'useEffect', 'useMemo', 'useRef', 'useCallback'];
                coreReact.forEach(hook => {
                    if (content.includes(hook) && !content.match(new RegExp(`import.*\\b${hook}\\b.*from ['"]react['"]`))) {
                        importsToAdd['react'].push(hook);
                    }
                });

                const nextNav = ['useRouter', 'usePathname', 'useSearchParams', 'notFound'];
                nextNav.forEach(hook => {
                    if (content.match(new RegExp(`\\b${hook}\\b`)) && !content.match(new RegExp(`import.*\\b${hook}\\b.*from ['"]next/navigation['"]`))) {
                        importsToAdd['next/navigation'].push(hook);
                    }
                });

                if (content.match(/\bLink\b/) && !content.includes('from "next/link"')) {
                    importsToAdd['next/link'].push('Link');
                }

                if (content.match(/\bMetadata\b/) && !content.includes('from "next"')) {
                    importsToAdd['next'].push('type Metadata');
                }

                // Apply missing imports
                let newImportLines = '';
                if (importsToAdd['react'].length > 0) newImportLines += `import { ${importsToAdd['react'].join(', ')} } from "react";\n`;
                if (importsToAdd['next/navigation'].length > 0) newImportLines += `import { ${importsToAdd['next/navigation'].join(', ')} } from "next/navigation";\n`;
                if (importsToAdd['next/link'].length > 0) newImportLines += `import Link from "next/link";\n`;
                if (importsToAdd['next'].length > 0) newImportLines += `import { ${importsToAdd['next'].join(', ')} } from "next";\n`;

                if (newImportLines) {
                    content = newImportLines + content;
                }

                // 2. Replace remaining Lucide tags safely
                // Look for <IconName
                let usedIcons = new Set();
                Object.keys(iconMap).forEach(lucideName => {
                    const faName = iconMap[lucideName];
                    const tagRegex = new RegExp(`<${lucideName}(\\s|>)`, 'g');
                    if (content.match(tagRegex)) {
                        content = content.replace(tagRegex, `<${faName}$1`);
                        usedIcons.add(faName);
                    }
                    const tagEndRegex = new RegExp(`</${lucideName}>`, 'g');
                    if (content.match(tagEndRegex)) {
                        content = content.replace(tagEndRegex, `</${faName}>`);
                    }
                });

                // 3. Remove any remaining lucide-react string
                content = content.replace(/import\s+{.*?}\s+from\s+["']lucide-react["'];?\s*/g, '');

                // 4. Ensure the required FA icons are correctly imported
                if (usedIcons.size > 0) {
                    // We might already have an FA import from the previous script run. Let's merge them.
                    const faRegex = /import\s+{(.*?)}\s+from\s+["']react-icons\/fa6["'];?/g;
                    let existingFa = new Set();
                    let match;
                    while ((match = faRegex.exec(content)) !== null) {
                        match[1].split(',').map(s => s.trim()).filter(Boolean).forEach(i => existingFa.add(i));
                    }
                    // Remove old FA imports
                    content = content.replace(faRegex, '');

                    // Combine
                    usedIcons.forEach(i => existingFa.add(i));

                    if (existingFa.size > 0) {
                        content = `import { ${Array.from(existingFa).join(', ')} } from "react-icons/fa6";\n` + content;
                    }
                }

                fs.writeFileSync(fullPath, content, 'utf8');
            }
        }
    }
    traverseDirs(dir);
    console.log("Repairs completed.");
}

fixAll();
