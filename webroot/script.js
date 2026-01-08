import {exec, toast, spawn} from './assets/kernelsu.js'
import './assets/mwc.js'

document.querySelector('div.preload-hidden').classList.remove('preload-hidden')

const MODDIR = '/data/adb/modules/brene'
const PERSISTENT_DIR = '/data/adb/brene'
const SUSFS_BIN = '/data/adb/ksu/bin/ksu_susfs'
const KSU_BIN = '/data/adb/ksu/bin/ksud'

// Load enabled features
exec('susfs show enabled_features').then(result => {
	const container = document.querySelector('#kernel-features-container')

	if (result.errno !== 0) {
		container.innerText = 'Failed to load enabled features'
		return
	}
	container.innerText = result.stdout.replaceAll('CONFIG_KSU_', '')
})

// Load brene version
exec(`grep "^version=" ${MODDIR}/module.prop | cut -d'=' -f2`).then(result => {
	if (result.errno !== 0) return

	const element = document.querySelector('span#brene-version')
	element.innerText = result.stdout
})

// Load susfs version
exec('susfs show version').then(result => {
	if (result.errno !== 0) return

	const element = document.querySelector('span#susfs-version')
	element.innerText = `${result.stdout}+`
})

//
//
//
;(() => {
	const configID = 'config_enable_log'
	const mdSwitchID = 'switch_enable_log'
	exec(`grep "^${configID}=" ${PERSISTENT_DIR}/config.sh | cut -d'=' -f2`).then(result => {
		if (result.errno !== 0) return

		const element = document.querySelector(`md-switch#${mdSwitchID}`)
		const value = parseInt(result.stdout)
		element.selected = value
		element.addEventListener('click', event => {
			const enabled = event.target.shadowRoot.children[0].classList.contains('unselected')
			const newConfigValue = +enabled
			const newConfig = `${configID}=${newConfigValue}`

			exec(`sed -i "s/^${configID}=.*/${newConfig}/" ${PERSISTENT_DIR}/config.sh`)
		})
	})
})()
//
//
//
;(() => {
	const configID = 'config_enable_avc_log_spoofing'
	const mdSwitchID = 'switch_enable_avc_log_spoofing'
	exec(`grep "^${configID}=" ${PERSISTENT_DIR}/config.sh | cut -d'=' -f2`).then(result => {
		if (result.errno !== 0) return

		const element = document.querySelector(`md-switch#${mdSwitchID}`)
		const value = parseInt(result.stdout)
		element.selected = value
		element.addEventListener('click', event => {
			const enabled = event.target.shadowRoot.children[0].classList.contains('unselected')
			const newConfigValue = +enabled
			const newConfig = `${configID}=${newConfigValue}`

			exec(`sed -i "s/^${configID}=.*/${newConfig}/" ${PERSISTENT_DIR}/config.sh`)
		})
	})
})()
//
//
//
;(() => {
	const configID = 'config_hide_sus_mnts_for_all_procs'
	const mdSwitchID = 'switch_hide_sus_mnts_for_all_procs'
	exec(`grep "^${configID}=" ${PERSISTENT_DIR}/config.sh | cut -d'=' -f2`).then(result => {
		if (result.errno !== 0) return

		const element = document.querySelector(`md-switch#${mdSwitchID}`)
		const value = parseInt(result.stdout)
		element.selected = value
		element.addEventListener('click', event => {
			const enabled = event.target.shadowRoot.children[0].classList.contains('unselected')
			const newConfigValue = +enabled
			const newConfig = `${configID}=${newConfigValue}`

			exec(`sed -i "s/^${configID}=.*/${newConfig}/" ${PERSISTENT_DIR}/config.sh`)

			enabled ? exec(`${SUSFS_BIN} hide_sus_mnts_for_all_procs 1`) : exec(`${SUSFS_BIN} hide_sus_mnts_for_all_procs 0`)

			toast('No need to reboot')
		})
	})
})()
//
//
//
;(() => {
	const configID = 'config_uname_spoofing'
	const mdSwitchID = 'switch_uname_spoofing'
	exec(`grep "^${configID}=" ${PERSISTENT_DIR}/config.sh | cut -d'=' -f2`).then(result => {
		if (result.errno !== 0) return

		const element = document.querySelector(`md-switch#${mdSwitchID}`)
		const value = parseInt(result.stdout)
		element.selected = value
		element.addEventListener('click', event => {
			const enabled = event.target.shadowRoot.children[0].classList.contains('unselected')
			const newConfigValue = +enabled
			const newConfig = `${configID}=${newConfigValue}`

			exec(`sed -i "s/^${configID}=.*/${newConfig}/" ${PERSISTENT_DIR}/config.sh`)
		})
	})
})()
//
//
//
;(() => {
	const configID = 'config_hide_data_local_tmp'
	const mdSwitchID = 'switch_hide_data_local_tmp'
	exec(`grep "^${configID}=" ${PERSISTENT_DIR}/config.sh | cut -d'=' -f2`).then(result => {
		if (result.errno !== 0) return

		const element = document.querySelector(`md-switch#${mdSwitchID}`)
		const value = parseInt(result.stdout)
		element.selected = value
		element.addEventListener('click', event => {
			const enabled = event.target.shadowRoot.children[0].classList.contains('unselected')
			const newConfigValue = +enabled
			const newConfig = `${configID}=${newConfigValue}`

			exec(`sed -i "s/^${configID}=.*/${newConfig}/" ${PERSISTENT_DIR}/config.sh`)
		})
	})
})()
//
//
//
// ;(() => {
// 	const configID = 'config_hide_modules_img'
// 	const mdSwitchID = 'switch_hide_modules_img'
// 	exec(`grep "^${configID}=" ${PERSISTENT_DIR}/config.sh | cut -d'=' -f2`).then(result => {
// 		if (result.errno !== 0) return

// 		const element = document.querySelector(`md-switch#${mdSwitchID}`)
// 		const value = parseInt(result.stdout)
// 		element.selected = value
// 		element.addEventListener('click', event => {
// 			const enabled = event.target.shadowRoot.children[0].classList.contains('unselected')
// 			const newConfigValue = +enabled
// 			const newConfig = `${configID}=${newConfigValue}`

// 			exec(`sed -i "s/^${configID}=.*/${newConfig}/" ${PERSISTENT_DIR}/config.sh`)
// 		})
// 	})
// })()
//
//
//
;(() => {
	const configID = 'config_hide_zygisk_modules'
	const mdSwitchID = 'switch_hide_zygisk_modules'
	exec(`grep "^${configID}=" ${PERSISTENT_DIR}/config.sh | cut -d'=' -f2`).then(result => {
		if (result.errno !== 0) return

		const element = document.querySelector(`md-switch#${mdSwitchID}`)
		const value = parseInt(result.stdout)
		element.selected = value
		element.addEventListener('click', event => {
			const enabled = event.target.shadowRoot.children[0].classList.contains('unselected')
			const newConfigValue = +enabled
			const newConfig = `${configID}=${newConfigValue}`

			exec(`sed -i "s/^${configID}=.*/${newConfig}/" ${PERSISTENT_DIR}/config.sh`)
		})
	})
})()
//
//
//
;(() => {
	const configID = 'config_hide_font_modules'
	const mdSwitchID = 'switch_hide_font_modules'
	exec(`grep "^${configID}=" ${PERSISTENT_DIR}/config.sh | cut -d'=' -f2`).then(result => {
		if (result.errno !== 0) return

		const element = document.querySelector(`md-switch#${mdSwitchID}`)
		const value = parseInt(result.stdout)
		element.selected = value
		element.addEventListener('click', event => {
			const enabled = event.target.shadowRoot.children[0].classList.contains('unselected')
			const newConfigValue = +enabled
			const newConfig = `${configID}=${newConfigValue}`

			exec(`sed -i "s/^${configID}=.*/${newConfig}/" ${PERSISTENT_DIR}/config.sh`)
		})
	})
})()
//
//
//
;(() => {
	const configID = 'config_hide_custom_recovery_folders'
	const mdSwitchID = 'switch_hide_custom_recovery_folders'
	exec(`grep "^${configID}=" ${PERSISTENT_DIR}/config.sh | cut -d'=' -f2`).then(result => {
		if (result.errno !== 0) return

		const element = document.querySelector(`md-switch#${mdSwitchID}`)
		const value = parseInt(result.stdout)
		element.selected = value
		element.addEventListener('click', event => {
			const enabled = event.target.shadowRoot.children[0].classList.contains('unselected')
			const newConfigValue = +enabled
			const newConfig = `${configID}=${newConfigValue}`

			exec(`sed -i "s/^${configID}=.*/${newConfig}/" ${PERSISTENT_DIR}/config.sh`)
		})
	})
})()
//
//
//
;(() => {
	const configID = 'config_hide_rooted_app_folders'
	const mdSwitchID = 'switch_hide_rooted_app_folders'
	exec(`grep "^${configID}=" ${PERSISTENT_DIR}/config.sh | cut -d'=' -f2`).then(result => {
		if (result.errno !== 0) return

		const element = document.querySelector(`md-switch#${mdSwitchID}`)
		const value = parseInt(result.stdout)
		element.selected = value
		element.addEventListener('click', event => {
			const enabled = event.target.shadowRoot.children[0].classList.contains('unselected')
			const newConfigValue = +enabled
			const newConfig = `${configID}=${newConfigValue}`

			exec(`sed -i "s/^${configID}=.*/${newConfig}/" ${PERSISTENT_DIR}/config.sh`)
		})
	})
})()
//
//
//
;(() => {
	const configID = 'config_hide_sdcard_android_data'
	const mdSwitchID = 'switch_hide_sdcard_android_data'
	exec(`grep "^${configID}=" ${PERSISTENT_DIR}/config.sh | cut -d'=' -f2`).then(result => {
		if (result.errno !== 0) return

		const element = document.querySelector(`md-switch#${mdSwitchID}`)
		const value = parseInt(result.stdout)
		element.selected = value
		element.addEventListener('click', event => {
			const enabled = event.target.shadowRoot.children[0].classList.contains('unselected')
			const newConfigValue = +enabled
			const newConfig = `${configID}=${newConfigValue}`

			exec(`sed -i "s/^${configID}=.*/${newConfig}/" ${PERSISTENT_DIR}/config.sh`)
		})
	})
})()
//
//
//
;(() => {
	const mdSwitchID = 'switch_enable_ksu_modules'
	const element = document.querySelector(`md-switch#${mdSwitchID}`)
	const element2 = document.querySelector(`md-switch#switch_disable_ksu_modules`)
	element.addEventListener('click', () => {
		if (element2.selected) element2.dispatchEvent(new Event('click', {bubbles: true}))

		spawn('for', [
			'i',
			'in',
			'$(ls /data/adb/modules);',
			'do',
			'[ -f "/data/adb/modules/${i}/disable" ]',
			'&&',
			'rm',
			'"/data/adb/modules/${i}/disable";',
			'done'
		])
	})
})()
//
//
//
;(() => {
	const mdSwitchID = 'switch_disable_ksu_modules'
	const element = document.querySelector(`md-switch#${mdSwitchID}`)
	const element2 = document.querySelector(`md-switch#switch_enable_ksu_modules`)
	element.addEventListener('click', () => {
		if (element2.selected) element2.dispatchEvent(new Event('click', {bubbles: true}))

		spawn('for', [
			'i',
			'in',
			'$(ls /data/adb/modules);',
			'do',
			'[ ! -f "/data/adb/modules/${i}/disable" ]',
			'&&',
			'touch',
			'"/data/adb/modules/${i}/disable";',
			'done'
		])
	})
})()
//
//
//
;(() => {
	const configID = 'config_kernel_umount'
	const mdSwitchID = 'switch_kernel_umount'
	exec(`grep "^${configID}=" ${PERSISTENT_DIR}/config.sh | cut -d'=' -f2`).then(result => {
		if (result.errno !== 0) return

		const element = document.querySelector(`md-switch#${mdSwitchID}`)
		const value = parseInt(result.stdout)
		element.selected = value
		element.addEventListener('click', event => {
			const enabled = event.target.shadowRoot.children[0].classList.contains('unselected')
			const newConfigValue = +enabled
			const newConfig = `${configID}=${newConfigValue}`

			exec(`sed -i "s/^${configID}=.*/${newConfig}/" ${PERSISTENT_DIR}/config.sh`)

			enabled ? exec(`${KSU_BIN} feature set 1 1`) : exec(`${KSU_BIN} feature set 1 0`)

			toast('No need to reboot')
		})
	})
})()
//
//
//
;(() => {
	const configID = 'config_custom_uname_spoofing'
	const mdSwitchID = 'switch_custom_uname_set_on_boot'
	exec(`grep "^${configID}=" ${PERSISTENT_DIR}/config.sh | cut -d'=' -f2`).then(result => {
		if (result.errno !== 0) return

		const element = document.querySelector(`md-switch#${mdSwitchID}`)
		const value = parseInt(result.stdout)
		element.selected = value
		element.addEventListener('click', event => {
			const enabled = event.target.shadowRoot.children[0].classList.contains('unselected')
			const newConfigValue = +enabled
			const newConfig = `${configID}=${newConfigValue}`

			exec(`sed -i "s/^${configID}=.*/${newConfig}/" ${PERSISTENT_DIR}/config.sh`)
		})
	})

	const resetButton = document.querySelector(`md-outlined-button#button_custom_uname_reset`)
	resetButton.addEventListener('click', () => {
		const configID1 = 'config_custom_uname_kernel_release'
		const configID2 = 'config_custom_uname_kernel_version'
		const newConfig1 = `${configID1}='default'`
		const newConfig2 = `${configID2}='default'`

		exec(`sed -i "s/^${configID1}=.*/${newConfig1}/" ${PERSISTENT_DIR}/config.sh`)
		exec(`sed -i "s/^${configID2}=.*/${newConfig2}/" ${PERSISTENT_DIR}/config.sh`)

		exec(`${SUSFS_BIN} set_uname 'default' 'default'`)
	})

	const applyButton = document.querySelector(`md-filled-button#button_custom_uname_apply`)
	applyButton.addEventListener('click', () => {
		const configID1 = 'config_custom_uname_kernel_release'
		const configID2 = 'config_custom_uname_kernel_version'
		const newConfigValue1 = document.querySelector('#text_field_custom_uname_release').value
		const newConfigValue2 = document.querySelector('#text_field_custom_uname_version').value
		const newConfig1 = `${configID1}='${newConfigValue1}'`
		const newConfig2 = `${configID2}='${newConfigValue2}'`

		if (newConfigValue1 !== '') exec(`sed -i "s/^${configID1}=.*/${newConfig1}/" ${PERSISTENT_DIR}/config.sh`)
		if (newConfigValue2 !== '') exec(`sed -i "s/^${configID2}=.*/${newConfig2}/" ${PERSISTENT_DIR}/config.sh`)

		exec(`${SUSFS_BIN} set_uname "${newConfigValue1}" "${newConfigValue2}"`)
	})
})()
